import "./Routines.css"
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router"
import { FaTrashAlt, FaRegEdit, FaPlus } from 'react-icons/fa'

const MyRoutines = ({ token, user, routines }) => {
	const navigate = useNavigate();


	const filteredRoutines = routines.filter(routine => {
		return routine.creatorId === user.id
	})

	return (
		<div className="routines">
			<h1>My Routines</h1>
			{token && <Link to='/routines/add' className="add-activity-btn">Add Routine</Link>}
			{filteredRoutines.map((routine) => {
				const { id, name, goal, activities } = routine;
				return (<>
					<div className="eachRoutine">
						<h3>Routine</h3>
						<p>Name: {name}</p>
						<p>Goal: {goal}</p>
					</div>
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
					</div>
				</>
				)
			})}
		</div>
	)
}

export default MyRoutines;