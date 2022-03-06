import { Navigate, useNavigate } from "react-router"
import { deleteRoutine } from "../api"
import UpdateRoutineForm  from "./UpdateRoutineForm"
import "./Routines.css"
import { toast } from "react-toastify"
import { FaTrashAlt } from 'react-icons/fa'

const Routines = ({token, user, routines, setRoutines, activities, setActivities, handleRoutines}) => {
	const navigate = useNavigate();

	const handleDelete = async (routineIdToDelete) => {
		try {
			console.log('clicked')
			const deletedRoutine = await deleteRoutine(routineIdToDelete, token)
			if (deletedRoutine) {
				const updatedRoutines = routines.filter(routine => routine.id !== routineIdToDelete)
				setRoutines(updatedRoutines)
				toast("Your routine has been deleted!")
			}
		} catch(error) {
			console.log(error.response.data.message)
		}
	}

	return <>
		<div className="routines">
			<h1>Routines</h1>
			{routines.map((routine) => {
				const { id, creatorId, creatorName, name, goal, activities } = routine
				return (
					<div key={routine.id} className="eachRoutine" >
						<h3>Routine</h3>
						<p>Name: {name}</p>
						<p>Goal: {goal}</p>

						{creatorId === user.id && <button onClick={() => navigate(`/routines/${id}/update`)}>Update Routine</button>}

						{!activities ? (<p>add activities</p>) : 
							<div className="activities">
								<h3>Activities</h3>
								<div className="table-wrapper"> 
									<table className="activities-table">
										<tr>
											<th>Name</th>
											<th>Description</th>
											<th>count</th>
											<th>duration</th>
											<th>delete</th>
										</tr>
							{activities.map(({ name, description, count, duration, id }) => {
								return (
									<tr key={id}>
										<td>{name}</td>
										<td>{description}</td>
										<td>{count}</td>
										<td>{duration}</td>
										{<td><FaTrashAlt role="button"
										tabIndex="0"
										/></td>}
									</tr>
								)
							})}
								</table>
							</div>
						</div>}
						<h3>Created By</h3>
						{creatorName}
						{creatorId === user.id && <button className="delete-button" onClick={() => handleDelete(id)}>Delete Routine</button>}

					</div>
				);
			})}
		</div>
	</>

}

export default Routines;