const Routine = ({routine}) => {
	return (
		<div>
			<h3>
				{routine.name}
			</h3>
			<div>
				{routine.goal}
			</div>
			<div>
				<h3>Activities</h3>
				{routine?.activities?.map((activity) => {
					return (
						<div key={activity.id}>
							<p>{activity.name}</p>
							<p>Duration: {activity.duration}</p>
							<p>Count: {activity.count}</p>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default Routine;