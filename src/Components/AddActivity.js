import { useState } from 'react';
import { addActivity } from '../api'
import { useNavigate } from 'react-router-dom';
import './Add.css'
import { toast } from "react-toastify"

const AddActivity = ({ token, activities, setActivities }) => {
	const navigate = useNavigate();
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const newActivity = await addActivity(token, name, description)
			console.log('newActivity: ', newActivity)
			setActivities([...activities, newActivity])
			navigate('/activities')
			toast('new activity added!')
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<div className="login-signup">
			<h1>Add Activity</h1>
			<form onSubmit={handleSubmit} className="login-signup">
				<input className="login-signup-input" value={name} placeholder="name" onChange={(event) => { setName(event.target.value) }} required />
				<input className="login-signup-input" placeholder="description" value={description} onChange={(event) => { setDescription(event.target.value) }} required />
				<button className="submit-activity-btn">Add Activity</button>
			</form>
		</div>
	)
}

export default AddActivity;