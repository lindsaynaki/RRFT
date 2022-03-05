import { useEffect } from 'react';
import { addActivity  } from '../api'
import { useNavigate } from 'react-router-dom';
import './Add.css'

const AddActivity = ({token, activities, setActivities, name, setName, description, setDescription}) => {
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
            try {
                console.log('button was clicked')
                const newActivity = await addActivity(token, name, description)
                console.log('newActivity: ', newActivity)
                setActivities([...activities, newActivity])
                navigate('/activities')
            } catch(error) {
                console.dir(error)
                console.log(error.response.data.message)
            }
    }

    useEffect(() => {
        setName('')
        setDescription('')
    }, [])

    return (
        
        <div className="login-signup">
            <h1>Add Activity</h1>
        <form onSubmit={handleSubmit} className="login-signup">            <input className="login-signup-input" value={name} placeholder="name" onChange={(event) => { setName(event.target.value) }} required />
            <input className="login-signup-input" placeholder="description" value={description} onChange={(event) => { setDescription(event.target.value) }} required />
            <button className="login-signup-btn">Add Activity</button>
        </form>
        </div>
    )
}

export default AddActivity;