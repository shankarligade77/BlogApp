// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { createURL } from '../config';



// const Profile = () => {
//     const [profileData, setProfileData] = useState("")
//     const navigate = useNavigate();


//     const loadProfile = () => {
//         const url = createURL("user/profile");

//         const token = sessionStorage["token"];
//         if (!token) {
//             navigate("/");
//             return;
//         }
//         axios.get(url, {
//             headers: {
//                 "x-token": token,
//             },
//         })
//             .then((response) => {
//                 const result = response.data;
//                 if (result["status"] === "success") {
//                     const data = result["data"];
//                     setProfileData(data)
//                 } else {
//                     alert("error while loading your Profile");
//                    // navigate("/")
//                 }
//             })
//             .catch((error) => {
//                 console.log(`error: `, error)
//             });
//     };
    

//     useEffect(() => {
//         loadProfile();
//     }, [])


//     return <div>
//         <Navbar />
//         <div className='mb-3'>
//             <div className="row">
//                 <div className="col-3"></div>
//                 <div className="col">
//                     <div className="vstack gap-4 profile" style={{marginTop:'70px'}}>
//                         <div className='text-center'>
//                         { profileData && <img className='rounded-circle ' style={{ width:'80px',height:'80px' }} src={'http://localhost:4000/' + profileData.profile_image} alt="profile image" />}
//                         </div>
                      
                        
                       
//                         <li className='text-center fw-bold fs-4'  style={{listStyleType:'none'}}><span>FirstName :</span>  <span>{profileData.firstName}</span></li>
//                         <li className='text-center fw-bold fs-4'  style={{listStyleType:'none'}}>LastName : <span>{profileData.lastName}</span></li>
//                         <li className='text-center fw-bold fs-4'  style={{listStyleType:'none'}}>Email: <span>{profileData.email}</span></li>
//                         <li className='text-center fw-bold fs-4 ' style={{listStyleType:'none'}}>Phone: <span>{profileData.phone}</span></li>

                       
//                     </div>
//                 </div>
//                 <div className="col-3"></div>
//             </div>

//         </div>
//     </div>
// }

// export default Profile



import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createURL } from "../config";
import Navbar from './Navbar';
function Profile(){

const  navigate=useNavigate()



    const[profileData,setProfileData]=useState("");

    const loadProfile = () => {
        const url = createURL("user/profile");
   
        const token = sessionStorage["token"];
        if (!token) {
          navigate("/");
          return;
        }
    
        axios
          .get(url, {
            headers: {
              "x-token": token,
            },
          })
          .then((response) => {
            const result = response.data;
            console.log("This is response", result["data"])
            if (result["status"] === "success") {
              const data = result["data"];
              console.log(data)
              console.log(`data of image =${data.profileImage}`)
              setProfileData(data)
            } else {
              toast.error("error while loading your todo items");
              navigate("/");
            }
          })
          .catch((error) => {
           
            console.log(`error found try to resoolve it: `, error);
          });
      };
    
      useEffect(() => {
        loadProfile();
      }, []);







const onEdit=()=>{
    navigate('/personalinfoEdit')
}
return<div>
 <Navbar />
<div className="row">
  <div className="col">

  </div>
  <div className="col"  style={{border:"1px solid black",borderRadius:"10px",marginTop:"90px", padding:"50px"}}>
  <div> 
                
         {/* <span className="profile-image"><img src={"http://localhost:4000/"+profileData.profileImage} width="150" alt="image" class="rounded-circle"/></span>       
<hr style={{width:"50%"}}/> */}
            <table >
                <tr>
                    <th>
                        Name :-
                    </th>
                    <td>
                  {profileData.firstName}&nbsp;{profileData.lastName}
                    </td>
                    
                </tr>
                <hr style={{width:"500%"}}/>
                <tr>
                    <th>
                        Mobile :-
                    </th>
                    <td>
                   {profileData.phone}
                    </td>
                    
                </tr>
                <hr style={{width:"500%"}}/>
                <tr>
                    <th>
                        Email :-
                    </th>
                    <td>
                  {profileData.email}
                    </td>
                    
                </tr>
                <hr style={{width:"500%"}}/>
            </table>
            <div className="text-center">
        <button onClick={onEdit}  className="edit btn btn-dark">Edit</button>
       </div>
        </div>
  </div>
  <div className="col">

  </div>
</div>





               
      
    

    </div>
    
}
export default Profile;