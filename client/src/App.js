import logo from './logo.svg';
import './App.css';
import {Routes,Route} from 'react-router-dom'
import Signup from './pages/Signup';
import Login from './pages/Login';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Blogs from './pages/Blogs';
import AddBlog from './pages/AddBlog';
import MyBlogs from './pages/MyBlogs';
import Navbar from './pages/Navbar';
import Profile from './pages/Profile';
import EditBlog from './pages/EditBlog';

function App() {
  return (
    <div  className="container ">
      
     <Routes>
      <Route path = 'signup' element={<Signup/>}/>
      <Route path = '/' element = {<Login/>} />
      <Route path = 'blogs' element={<Blogs/>} />
      <Route path = 'addblog' element={<AddBlog/>} />
      <Route path = 'myblogs' element={<MyBlogs/>} />
      <Route path = 'navbar' element ={<Navbar/>} />
      <Route path = 'profile' element ={<Profile/>} />
      <Route path = 'edit-blog/:id' element ={<EditBlog/>} />
     </Routes>

     <ToastContainer/>
    </div>
  );
}

export default App;
