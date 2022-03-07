import { useNavigate } from "react-router"
import { deleteRoutine } from "../api"
import { useEffect } from "react"
import { Link } from 'react-router-dom';
import "./Routines.css"
import { toast } from "react-toastify"
import { FaTrashAlt, FaRegEdit, FaPlus } from 'react-icons/fa'

const Routines = ({ token, user, routines, setRoutines, activities, setActivities, handleRoutines }) => {
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
		} catch (error) {
			console.log(error.response.data.message)
		}
	}


	useEffect(() => {
		handleRoutines();
	}, [])

	return <>
		<div className="routines">
			<h1>Routines</h1>
			{token && <Link to='/routines/add' className="add-activity-btn">Add Routine</Link>}
			{routines.map((routine) => {
				const { id, creatorId, creatorName, name, goal, activities } = routine
				return (
					<div key={routine.id} className="eachRoutine" >
						<h3>Routine</h3>
						<p>Name: {name}</p>
						<p>Goal: {goal}</p>

						{activities &&
							<div className="activities">
								<h3>Activities</h3>
								<div className="table-wrapper">
									<table className="activities-table">
										<tr>
											<th>Name</th>
											<th>Description</th>
											<th>count</th>
											<th>duration</th>
											<th><FaPlus className="add-svg" role="button" onClick={() => navigate(`/routines/${id}/addactivity`)} /></th>
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
						<p>Created By {creatorName}</p>
						{creatorId === user.id && <FaRegEdit role="button" className="fa-edit" onClick={() => navigate(`/routines/${id}/update`)} />}
						{creatorId === user?.id && <FaTrashAlt role="button" className="delete-button" onClick={() => handleDelete(id)} />}

					</div>
				);
			})}
		</div>
	</>

}

export default Routines;