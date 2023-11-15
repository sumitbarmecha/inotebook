import React,{useState} from 'react'
import './loginpagecss.css'
import { useNavigate } from 'react-router-dom'
import { Link, useLocation } from 'react-router-dom'
const Login = () => {
const [credentials, setCredentials] = useState({email:''
	,password:''})
let history = useNavigate()
	let location = useLocation();
	const onChange = (e) => {
		setCredentials({ ...credentials,[e.target.name]:e.target.value })
	  }
	const onsubmitlogin  = async(e)=>{
		e.preventDefault();
		const response = await fetch('http://localhost:5000/api/auth/login', {
		  method: 'POST',
		  headers: {'Content-Type':'application/json'},
		  body:JSON.stringify({email:credentials.email,password:credentials.password})
		});
		const json = await response.json()
		console.log(json.msg) 

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
			<form className="login" onSubmit={onsubmitlogin}>
				<input className='m-3 ' name='email' onChange={onChange} value={credentials.email} id='email' type="text" placeholder="EMAIL" />
				<input className='m-3 ' name='password' onChange={onChange}  value={credentials.password} id='password' type="password" placeholder="PASSWORD" />
				<button className='bt-sm border-0' >Login</button>
				<li className="nav-item">
					<Link className={`nav-link m-0 py-0 text-white ${location.pathname === "/signup" ? "activate" : ""}`} to="/signup" > Signup</Link>
				</li>
			</form>


		</div>
	)
}

export default Login