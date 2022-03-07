import { useState, useEffect } from 'react';
import { addRoutine } from '../api'
import { useNavigate } from 'react-router-dom';
import './Add.css'
import { toast } from "react-toastify"


const AddRoutine = ({ token, handleRoutines }) => {
	const blankRoutine = {
		isPublic: false,
		name: "",
		goal: ""
	}
	const [routineToAdd, setRoutineToAdd] = useState(blankRoutine);
	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			await addRoutine(token, routineToAdd);
			await handleRoutines();
			navigate('/routines')
			toast('New routine added!')
		} catch (error) {
			console.dir(error)
		}
	}

	return (
		<div className="add-routine-container">
			<h1>Add Routine</h1>
			<form onSubmit={handleSubmit} className="add-routine-container">
				<input className="login-signup-input" value={routineToAdd.name} placeholder="name" onChange={(event) => { setRoutineToAdd({ ...routineToAdd, name: event.target.value }) }} required />
				<input className="login-signup-input" placeholder="goal" value={routineToAdd.goal} onChange={(event) => { setRoutineToAdd({ ...routineToAdd, goal: event.target.value }) }} required />
				<label htmlFor="public" className="public">Public?</label>
				<select value={routineToAdd.isPublic}
					onChange={(event) => { setRoutineToAdd({ ...routineToAdd, isPublic: (event.target.value === "true" ? true : false) }) }}>
					<option value={true}>Yes</option>
					<option value={false}>No</option>
				</select>
				<button className="submit-routine-btn">Add Routine</button>
			</form>
		</div>
	)
}

export default AddRoutine;