import {BrowserRouter, Route, Routes} from 'react-router-dom'
import SignUp from './Pages/SignUp'
import SignIn from './Pages/SignIn'
import Blog from './Pages/Blog'


export default function App() {
  return (
   <>
   <BrowserRouter>
    <Routes>
    <Route path='/signup' element={<SignUp/>}/>
    <Route path='/signin' element={<SignIn/>}/>
    <Route path='/' element={<Blog/>}/>

    </Routes>
   </BrowserRouter>
   
   </>
  )
}