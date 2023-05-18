
import {Link,useNavigate} from 'react-router-dom'
function Navbar() {

  const navigate=useNavigate();


  const onLogOut = () => {
    sessionStorage.removeItem("firstName");
    sessionStorage.removeItem("lastName");
    sessionStorage.removeItem("token");
        navigate("/")
  };
  if (sessionStorage.length !== 0) {
    return <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary" >
      <div className="container-fluid main-container" >
        <Link to="/blogs" className="navbar-brand" style={{color:'white',padding:'10px',marginRight:'70px'}}>Blogs</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/myblogs" className="nav-link " style={{color:'white',padding:'15px',marginRight:'70px'}} aria-current="page"> My Blogs</Link>
            </li>
            <li className="nav-item">
              <Link to="/addblog" className="nav-link " aria-current="page" style={{color:'white',padding:'15px',marginRight:'70px'}}>Add Blog</Link>
            </li>
            <li className="nav-item">
              <Link to="/profile" className="nav-link " aria-current="page" style={{color:'white',padding:'15px',marginRight:'100px'}}>Profile</Link>
            </li>

            <li className='nav-item'>
            <Link to="" className="nav-link float-end " aria-current="page" style={{color:'white',padding:'15px',marginRight:'0px',marginLeft:'40px'}}>Welcome , {sessionStorage['firstName']}</Link>  
            </li>
            <li className="nav-item">
            <button style={{background:"none",border:"none",marginTop:"6px" , color:"grey"}} onClick={onLogOut}>Logout</button>
              {/* <Link onClick={onLogOut} className="nav-link float-end" aria-current="page" style={{color:'white',padding:'15px',marginRight:'0px',marginLeft:'180px'}}>Logout</Link> */}
            </li>
            
           
          </ul>
        </div>
      </div>
    </nav>

    <div>

    </div>

    </div>
  }
}

export default Navbar;