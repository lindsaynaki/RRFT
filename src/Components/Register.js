import { register } from '../api';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import './LoginRegister.css'

const Register = ({token, setToken}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [ errMsg, setErrMsg ] = useState('')
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
        const newToken = await register(username, password);
            setToken(newToken)
            navigate('/')
        } catch(error) {
            console.log(error.response.data.message)
            setErrMsg(error.response.data.message)
    }}

    return (
        <div>
            <form onSubmit={handleSubmit} className="routines">
                <h2>Register</h2>
                {errMsg && <p className="error">{errMsg}</p>}
                <input className="login-signup-input" value={username} placeholder="username" onChange={(event) => { setUsername(event.target.value) }} required />
                <input className="login-signup-input" type="password" placeholder="password" pattern=".{5,}" title="Password must be 5 characters" value={password} onChange={(event) => { setPassword(event.target.value) }} required />
                <button className="login-signup-btn">CREATE ACCOUNT</button>
                <Link to='/login'>Already have an account? Sign in</Link>
            </form>
        </div>
    )
}

export default Register; 