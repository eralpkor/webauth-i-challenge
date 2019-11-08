import React, { useState, useEffect } from 'react';
import axios from 'axios';

const axiosWithAuth = () => {
  return axios.create({ withCredentials: true })
}

const Users = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/api/users', { withCredentials: true })
      .then(res => {
        setUsers(res.data)
      })
      .catch(err => {
        console.log(err.response);
      })
  }, [])

  return (
    <div>
      {users.map(user => <p key={user.id}>{user.username}</p>)}
      {users.map(user => <div key={user.id}>{JSON.stringify(user)}</div>)}
    </div>
  )
}

export default Users;