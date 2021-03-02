import React, { useState, useEffect } from "react";
import { Navbar, Nav, NavDropdown , Form, FormControl, Button, Card, Jumbotron} from "react-bootstrap";
import { Link, NavLink} from "react-router-dom";
import './carddetails.css';

function Cards(props){

    async function loadCards(){
        let response = await fetch("http://localhost:8000/api/allcards");
        let tabledata = await response.json();
        props.setdata(tabledata);
    }
    useEffect(()=>{
        loadCards();
    
    }, [props.newcard]);


    return (
        <div className="row">
            {props.data.map((blog) =>
            <div className="col-4">
                <Card className="mb-4 mr-2" style={{ height:'10rem' }}>
                    <Card.Body>
                        <Card.Title className="h2">{blog.name}</Card.Title>
                        <a href= {`/details/${blog.id}`} className="h5">DETAILS</a>
                        <hr/>
                        <p href="#">{blog.addedDate}</p>
                    </Card.Body>
                </Card>
            </div>
            )}
    </div>
    )
}

function Search(props){
    const [text, settext] = useState("");

    const handleSearchchange = event =>{
        settext(event.target.value)
        props.setis_searched(true)
    }
    
    
    async function SearchCards(){
        let response;
        if(text.length>0){
            
            response = await fetch("http://localhost:8000/api/search/card/"+text);
        }else{
            props.setis_searched(false);
            response = await fetch("http://localhost:8000/api/allcards");
        }
        let search_data = await response.json();
        props.setdata(search_data);
    }
    useEffect(()=>{   
        SearchCards();
    }, [text]);

    return(
        <>
            <Form.Group controlId="formBasicEmail" className="mt-4">
                <Form.Control className="searchbar" type="text" placeholder="Search" onChange={handleSearchchange} value={text} />
            </Form.Group>
            { text.length>0 ?
                <>
                    <h4>Search result for:"{text}"</h4>
                    
                </> :
                
                <></>
            }
        </>
    );
}

function AddnewCard(props){
    const [name, setName] = useState("");
    const [newcard, setNewcard] = useState(0);
    const [is_searched, setis_searched] = useState(false)
    const handleNamechange = event =>{
        setName(event.target.value)
    }

    const handlesubmit = event =>{
        const data = {name}
        addCard(data);
        setName("");
        event.preventDefault();
        
    }

    async function addCard(data){
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
        <Search className="mb-4" 
                newcard={newcard} 
                data={props.data}
                setdata={props.setdata}
                is_searched={is_searched}
                setis_searched={setis_searched}/>
    { is_searched===false ?
        <Card className=" col-6 offset-3 mb-4 mt-3" style={{backgroundColor:"white"}}>
            <Form onSubmit={handlesubmit}>
                <Form.Group controlId="formBasicEmail" className="mt-4">
                    <Form.Control type="text" placeholder="Create new card" onChange={handleNamechange} value={name} />
                </Form.Group>
                <p>
                    <Button type="submit" variant="dark">ADD NEW +</Button>
                </p>
            </Form>
        </Card>:
        <></>
    }
    { props.data.length>0 ?
        <Cards newcard={newcard}
                data={props.data}
                setdata={props.setdata}/>:

                <div className="col-md-6 offset-4 mt-5">
                    <h2>Results Not Found</h2>
                </div>
    }
        </>
    
    )
}

function CardDetails(props){
    const [data, setdata] = useState([]);
    return (
        <>
        <AddnewCard data={data}
                    setdata={setdata}/>
        </>
    );
}

export default CardDetails;