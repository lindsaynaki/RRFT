import { deleteRoutine, updateRoutine } from "../api"
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AddActivityToRoutineForm from "./AddActivityToRoutineForm";



const UpdateRoutineForm = ( {token, routines, setRoutines, handleRoutines, activities} ) => {
    const params = useParams()
    const navigate = useNavigate();
    const {routineId} = params;
    const [routineUpdate, setRoutineUpdate] = useState(null)

    const routineToUpdate = routines.find((routine) => {
        return routine.id === Number(routineId) 
    })

    console.log('routine to update: ', routineToUpdate.name)

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await updateRoutine(token, routineId, routineToUpdate.name, routineToUpdate)
            console.log('success?? updated routines: ' , updateRoutine)
            setRoutineUpdate(updateRoutine)
            await handleRoutines();
            navigate('/routines')
        } catch(error) {
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
            <h2>Update Your Routine</h2>
            <form onSubmit={handleSubmit} >
                <label>Name</label>
                <input placeholder="name" onChange={(event) => {setRoutineUpdate(event.target.value)}} required />
                <label>Goal</label>
                <input placeholder="goal" onChange={(event) => {setRoutineUpdate({...routineUpdate, goal: event.target.value})}}required />
                <button>Update</button>
            </form>
            <AddActivityToRoutineForm routineId={routineId} token={token} handleRoutines={handleRoutines} activities={activities}/>
        </div>
    )
}

export default UpdateRoutineForm 