import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar.jsx';
import CreaProgrammazione from './components/CreaProgrammazione.jsx';
import Footer from './components/Footer.jsx';
import './App.css';

function App() {
  return (
    <div className="App">
           <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<CreaProgrammazione/>}/>

      </Routes>
      <Footer/>
      </BrowserRouter>

    </div>
  );
}

export default App;
