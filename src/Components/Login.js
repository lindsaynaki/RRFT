import { login } from '../api';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './LoginRegister.css'

const Login = ({ setToken }) => {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword] = useState('');
    const [ errMsg, setErrMsg ] = useState('')
    const navigate = useNavigate();

    const handleSubmit = async(event) => {
        event.preventDefault();
            try {
                const token = await login(username, password)
                localStorage.setItem('token', token)
                setToken(token)
                navigate('/')
                toast("You are logged in!");
            } catch(error) {
                toast.error(error.response.data.message);
                console.log(error.response.data.message)
                console.dir(error)
                setErrMsg(error.response.data.message)
            }
    }

    return (
        <form onSubmit={handleSubmit} className="login-signup">
            <h2>Log In</h2>
            {errMsg && <p className="error">{errMsg}</p>}
            <input className="login-signup-input" value={username} placeholder="username" onChange={(event) => { setUsername(event.target.value) }} required />
            <input className="login-signup-input" type="password" placeholder="password" value={password} onChange={(event) => { setPassword(event.target.value) }} required />
            <button className="login-signup-btn">LOG IN</button>
            <Link to='/register'>Don't have an account? Sign up</Link>
        </form>
    )
}

export default Login; 