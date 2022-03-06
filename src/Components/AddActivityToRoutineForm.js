import { useState } from "react";
import { addActivityToRoutine } from "../api";
import Routines from "./Routines";

const AddActivityToRoutineForm = ({activities, token, routineId, handleRoutines}) => {
	const [activityId, setActivityId] = useState(0);
	const [count, setCount] = useState(0);
	const [duration, setDuration] = useState(0);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await addActivityToRoutine(routineId, activityId * 1, count * 1, duration * 1, token);
			await handleRoutines();
		} catch (e) {
			console.error(e);
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<h2>Add an activity to this routine</h2>
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