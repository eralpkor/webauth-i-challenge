import React, { useState, useEffect } from 'react';
import axios from 'axios';


const initialState = {
  username : '',
  password : ''
}



const Login = ({history}) => {
  const [creds, setCreds] = useState(initialState);
  const [err, setErr] = useState(null);

  const handleChange = e => setCreds({...creds, [e.target.name]: e.target.value });

 

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('http://localhost:4000/api/login', creds, { withCredentials: true })
      .then(res => {
        console.log(res.data)
        setCreds(initialState);
        history.push('/');
      })
      .catch(err => {
        console.log(err)
        setErr(err.response.data.message)
      })
  }

  return (
    <form onSubmit={handleSubmit}>
      
      <input 
      placeholder='username' 
      name='username'
      value={creds.username}
      onChange={handleChange}
      />
      <input 
      type='password' 
      placeholder='password' 
      name='password' 
      value={creds.password}
      onChange={handleChange}
      />
      <button type='submit'>Login</button>
      {err && <div>{err}</div>}
    </form>
  )
}

export default Login;