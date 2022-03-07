import { updateRoutine } from "../api"
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateRoutineForm = ({ token, routines, handleRoutines }) => {
    const params = useParams()
    const navigate = useNavigate();
    const { routineId } = params;
    const [routineUpdate, setRoutineUpdate] = useState(null)

    const routineToUpdate = routines.find((routine) => {
        return routine.id === Number(routineId)
    })

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await updateRoutine(token, routineId, routineToUpdate.name, routineToUpdate)
            setRoutineUpdate(updateRoutine)
            await handleRoutines();
            navigate('/routines')
        } catch (error) {
            console.dir(error)
        }
    }

    useEffect(() => {
        handleRoutines();
    }, [token]);

    useEffect(() => {
        const routineToEdit = routines.find((routine) => {
            return routine.id === routineId * 1;
        });
        setRoutineUpdate(routineToEdit);
    }, [routines]);

    return (
        <div>
            <form onSubmit={handleSubmit} className="login-signup border-1px">
                <h2>Update Your Routine</h2>
                <label >Name</label>
                <input className="login-signup-input" placeholder="name" onChange={(event) => { setRoutineUpdate(event.target.value) }} required />
                <label>Goal</label>
                <input className="login-signup-input" placeholder="goal" onChange={(event) => { setRoutineUpdate({ ...routineUpdate, goal: event.target.value }) }} required />
                <button className="submit-activity-btn">Update</button>
            </form>

        </div>
    )
}

export default UpdateRoutineForm