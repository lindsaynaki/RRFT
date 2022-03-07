import { useState, useEffect } from "react";
import { addActivityToRoutine } from "../api";
import {useParams, useNavigate} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";


const AddActivityToRoutineForm = ({activities, routines, token, handleRoutines}) => {
	const params = useParams();
	const {routineId} = params;
	const navigate = useNavigate();
	const [activityId, setActivityId] = useState(0);
	const [count, setCount] = useState(0);
	const [duration, setDuration] = useState(0);


	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			console.log('clicked')
			console.log('routineId: ', routineId)
			await addActivityToRoutine(routineId, activityId * 1, count * 1, duration * 1, token);
			await handleRoutines();
			navigate('/routines')
			toast('your activity has been added!')
		} catch (e) {
			console.dir(e);
		}
	}
        const routineToEdit = routines.find((routine) => {
          return routine.id === routineId * 1;
        });
		console.log('routine add activity', routineToEdit)

	// useEffect(() => {
    //     const routineToEdit = routines.find((routine) => {
    //       return routine.id === routineId * 1;
    //     });
    //   }, [routines]);


	return (
		<form onSubmit={handleSubmit}>
			<h2>Add an activity to this routine</h2>
			{/* {routines.find((routine) => {
				return routine.id  === routineId * 1
			})} */}
			{/* {routines.map((routine) => {
				const {name, goal, activities } = routine
				return (
					<div>
						<h3>Routine</h3>
						<p>Name: {name}</p>
						<p>Goal: {goal}</p>
					</div>

				)
			})} */}
			<label>Activity</label>
			<select value={activityId} onChange={(e) => {
				setActivityId(e.target.value)	
			}}>
				{activities.map((activity) => {
					return (
						<option value={activity.id} key={activity.id}>{activity.name}</option>
					)
				})}
			</select>
			<label>Count</label>
			<input value={count} onChange={(e) => setCount(e.target.value)} type="number" />
			<label>Duration</label>
			<input value={duration} onChange={(e) => setDuration(e.target.value)} type="number" />
			{<button type="submit">Submit</button>}
		</form>
	)
}

export default AddActivityToRoutineForm;