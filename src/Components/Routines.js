import { Navigate, useNavigate } from "react-router"
import { deleteRoutine } from "../api"
import UpdateRoutineForm  from "./UpdateRoutineForm"
import "./Routines.css"

const Routines = ({token, user, routines, setRoutines, activities, setActivities, handleRoutines}) => {
	const navigate = useNavigate();

	const handleDelete = async (routineIdToDelete) => {
		try {
			console.log('clicked')
			const deletedRoutine = await deleteRoutine(routineIdToDelete, token)
			if (deletedRoutine) {
				const updatedRoutines = routines.filter(routine => routine.id !== routineIdToDelete)
				setRoutines(updatedRoutines)
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

						{/* {creatorId === user.id && <UpdateRoutineForm id={id} creatorId={creatorId} creatorName={creatorName} name={name} goal={goal} token={token} handleRoutines={handleRoutines}/>} */}

						{creatorId === user.id && <button onClick={() => navigate(`/routines/${id}/update`)}>Update Routine</button>}

						<div className="activities">
							<h3>Activities</h3>
							{activities && activities.map(({ name, description, count, duration, id }) => {
								return (
									<div key={id}>
										<p>name: {name}</p>
										<p>description: {description}</p>
										<p>count: {count}</p>
										<p>duration: {duration}</p>
									</div>
								)
							})}
						</div>
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