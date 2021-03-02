import React, { useState, useEffect } from "react";
import { Navbar, Nav, NavDropdown,Modal , Form, FormControl, Button, Card, Jumbotron} from "react-bootstrap";
import { Link, NavLink, useParams} from "react-router-dom";


function OneCard(){
    let {cardid} = useParams();
    const[data, setdata] = useState([]);
    const[id, setId] = useState(cardid);
    const[cardName, setCardname] = useState("");
    const[cardAdded, setcardAdded] = useState("");
    const [name, setName] = useState("");
    const [newcard, setNewcard] = useState(0);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function getCard(id){
        
        let response = await fetch("http://localhost:8000/api/getCard/"+id);
        console.log(response);
        if(response.status==200){
            let carddata = await response.json();
            setCard(carddata);
        }
    }
    useEffect(()=>{
        getCard(id); 
    }, []);
    
    async function setCard(data){
        setCardname(data.name);
        setName(data.name)
        setcardAdded(data.addedDate);
    }

        const handleNamechange = event =>{
            setName(event.target.value)
        }
    
        const handlesubmit = event =>{
            const data = {id, name}
            editCard(data);
            handleClose()
            event.preventDefault();
            
        }

        async function editCard(data){
       
            const response = await fetch("http://localhost:8000/api/saveCard",{
                method:"POST",
                mode: "cors",
                cache:"no-cache",
                credentials:"same-origin",
                headers:{
                    "Content-Type":"application/json"
                },
                redirect:"follow",
                referrerPolicy:"no-referrer",
                body: JSON.stringify(data)
            });
            
            let res = await response.json();
            setNewcard(res.id);
        }

    return (
        <>
        <Card className="mt-5 mr-3 mx-auto" style={{backgroundColor:'#546E7A',color:'white'}}>
            <Card.Title className="mt-4 ml-3">
            {cardName}
            </Card.Title>
            <Card.Body>
            {cardAdded}
            </Card.Body>
            <Card.Footer>
                <div className="form-inline">
                <Button variant="primary" onClick={handleShow}>
                    Edit
                </Button>
                {/* <Link className="ml-5" style={{fontWeight:'bold',color:'white'}} onClick = {toDeleteItem}>Delete</Link> */}
                </div>
                <Modal show={show} onHide={handleClose}>
                    <Form onSubmit={handlesubmit}>
                        <Modal.Header closeButton>
                        <Modal.Title>Edit</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group controlId="formBasicEmail" className="mt-4">
                            <Form.Control type="text" placeholder="Edit card" onChange={handleNamechange} value={name} />
                        </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" type="submit">
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </Card.Footer>
        </Card>
        <AddnewTask id={id}/>
        
        </>
    )
}

function ListTasks({newcard}){
    let {cardid} = useParams();
    const[id, setId] = useState(cardid);
    const [data, setdata] = useState([]);

    async function loadCards(id){
        let response = await fetch("http://localhost:8000/api/getTasks/"+id);
        let tabledata = await response.json();
        setdata(tabledata);
    }
    useEffect(()=>{
        loadCards(id); 
    }, [newcard]);

    return (
        <div>
            {data?.map((row) => (
                <Card className="col mt-4 mx-auto" >
                    <Card.Title className="mt-4 ml-3">
                    {row.textTask}
                    </Card.Title>
                    <Card.Body>
                        {row.addedDate}
                    </Card.Body>
                    <Card.Footer>

                        <div className="form-inline">

                         <h6>Done</h6>
                              <Form className="ml-3 mb-1">
                              <Form.Check 
                                type="switch"
                                id="custom-switch"
                                value="true"
                             />
                         </Form> 
                        </div>
                    </Card.Footer>
                </Card>
            ))}
    </div>
    )
}



function AddnewTask({id}){
    const [textTask, settextTask] = useState("");
    const [newcard, setNewcard] = useState(0);

    const handleNamechange = event =>{
        settextTask(event.target.value)
    }

    const handlesubmit = event =>{
        const data = {textTask}
        addTask(data, id);
        settextTask("");
        event.preventDefault();
        
    }

    async function addTask(data, id){
        console.log(id);
        const response = await fetch("http://localhost:8000/api/addTask/"+id ,{
            method:"POST",
            mode: "cors",
            cache:"no-cache",
            credentials:"same-origin",
            headers:{
                "Content-Type":"application/json"
            },
            redirect:"follow",
            referrerPolicy:"no-referrer",
            body: JSON.stringify(data)
        });
        
        let res = await response.json();
        setNewcard(res.id);
        
    }
    
    return (
        <>
        
        <Card className="col mt-4" style={{backgroundColor:"white"}}>
            <Form onSubmit={handlesubmit}>
                <Form.Group controlId="formBasicEmail" className="mt-4">
                    <Form.Control type="text" placeholder="Create new task" onChange={handleNamechange} value={textTask} />
                </Form.Group>
                <p>
                    <Button type="submit" variant="primary">ADD NEW ++</Button>
                </p>
            </Form>
        </Card>
        <ListTasks newcard={newcard}/>
        </>
    )
}

function CardTask(props){
    return (
        <>
        <OneCard/>    
        </>
    );
}

export default CardTask;