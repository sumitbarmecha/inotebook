import React,{useState} from 'react'
import './loginpagecss.css'
import {Link,useLocation,useNavigate} from 'react-router-dom'
const Signup = () => {
  const [credentials, setCredentials] = useState({name:'',email:''
,password:'',confirmpassword:''
})
let history = useNavigate()
  let location = useLocation();
  const onChange = (e) => {
		setCredentials({ ...credentials,[e.target.name]:e.target.value })
	  }
  const onsubmitsignup  = async(e)=>{
  e.preventDefault()
  const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json',
    'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwZjVmYmViMjQ4MTE4YjUzZWQxNzI3In0sImlhdCI6MTY0NTI4Mjc2OH0.gBIjKxS9E9RayKgYKRZNpMRzS1gN3cXA3H6R7BNgBaA'},
  });
  const json = await response.json()
  console.log(json) 
  if (json.msg) {
    // save the authtoken and redirect
    localStorage.setItem('token',json.authtoken)
    history('/');
  
  }
  else{
    alert('invalid credentials')
  }

  }
  return (
    <div className='m-5 p-5'>

      <form className="login" onSubmit={onsubmitsignup}>
        <input type="text" name=' name' onChange={onChange} id=' name' placeholder="NAME" />
        <input type="text" name='email' onChange={onChange} id='email' placeholder="EMAIL" />
        <input type="password" name=' confirmpassword' onChange={onChange} id=' confirmpassword' placeholder="CONFIRM PASSWORD" />

        <button className='border-0' >SIGN UP </button>
        <li className="nav-item">
          <Link className={`nav-link  m-0 py-0 text-white ${location.pathname === "/login" ? "activate" : ""} `} to="/login" > Login</Link>
        </li>
      </form>
    </div>
  )
}

export default Signup