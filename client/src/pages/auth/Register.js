import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handelSubmit = async (e)=> {
        e.preventDefault();
        try {
            const {data} = await axios.post(
                `/register`,
                {
                    name,
                    email,
                    password,
                }
            );

            // console.log(data)

            if (data?.error) {
                toast.error(data.error)
            } else {
                toast.success("Successful registration")
            }

        } catch (error) {
            console.log(error);
            toast.error("Registration failed. Try again!");
        }
    }

  return (
    <>
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <form onSubmit={handelSubmit} >                       
                        <input 
                         type="text"
                         value={name}
                         placeholder="Full Name"
                         autoFocus
                         onChange={(e)=> setName(e.target.value)}
                         className="form-control mb-4 p-2"
                        />
                        <input 
                          type="email"
                          value={email}
                          placeholder="E-mail"
                          onChange={(e)=> setEmail(e.target.value)}
                          className="form-control mb-4 p-2"
                        />
                        <input
                          type="password"
                          value={password} 
                          placeholder="Password"
                          onChange={(e)=> setPassword(e.target.value)}
                          className="form-control mb-4 p-2"
                        />
                        <button type="submit" className="btn btn-primary">submit</button>
                    </form>
                </div>
            </div>
        </div>
    </>
  )
}

export default Register