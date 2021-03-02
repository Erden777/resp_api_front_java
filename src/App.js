import logo from './logo.svg';
import './App.css';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Home from './Components/Home/Home'

function App() {      
  return (
    <> 
   
    <Header/>
    <div className="container mt-4" style={{minHeight:"85vh"}}>
      <Home/>
    </div>
    <Footer/>
    </>
  );
}

export default App;
