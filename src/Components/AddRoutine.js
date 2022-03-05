import { useEffect } from 'react';
import { addRoutine  } from '../api'
import { useNavigate } from 'react-router-dom';

const AddRoutine = ({token, routines, setRoutines, routineName, setRoutineName, goal, setGoal, isPublic, setIsPublic, handleRoutines}) => {
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
            try {
                console.log('button was clicked')
                const newRoutine = await addRoutine(token, isPublic, routineName, goal)
                console.log('new routine: ', newRoutine)
                console.log('routines: ', routines)
                // setRoutines([...routines, newRoutine])
                //handle routines
                await handleRoutines();
                navigate('/routines')
            } catch(error) {
                console.dir(error)
                // console.log(error.response.data.message)
            }
    }

    useEffect(() => {
        setRoutineName('')
        setGoal('')
        setIsPublic(false)
    }, [])

    return (
        <div className="login-signup">
            <h1>Add Routine</h1>
        <form onSubmit={handleSubmit} className="login-signup">
            <input className="login-signup-input" value={routineName} placeholder="name" onChange={(event) => { setRoutineName(event.target.value) }} required />
            <input className="login-signup-input" placeholder="goal" value={goal} onChange={(event) => { setGoal(event.target.value) }} required />
            <label htmlFor="public" className="public">Public?</label>
            <select>
                value={isPublic}
                onChange={(event) => { setIsPublic(event.target.value)}}
                <option value={true}>Yes</option>
                <option value={false}>No</option>
            </select>
            <button className="login-signup-btn">Add Routine</button>
        </form>
        </div>
    )
}

export default AddRoutine; 