
import { BrowserRouter, Route, Routes, } from 'react-router-dom';

import Home from './Component/Home';
import NavBar from './Component/NavBar';

import Form from "./Component/Singup"

function App() {
return (
<div className="App">
  <BrowserRouter>
  <NavBar/>
  <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/login' element={<Form />} />

  

  </Routes>

</BrowserRouter>
</div>

);
}

export default App;