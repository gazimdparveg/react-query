 import './App.css'
 import { BrowserRouter , Routes, Route} from "react-router-dom"
import Home from './Home'
import ProdetesDeteles from './ProdetesDeteles'

function App() { 
  
  return (
    <>
   
   

    <BrowserRouter>
   <Routes> 

   <Route path='/' element={ <Home/>}> </Route>
   <Route path='/Prodect/:id' element={ <ProdetesDeteles/> }> </Route>
     
   </Routes>
  </BrowserRouter>


     

    
      
    </>
  )
}

export default App
