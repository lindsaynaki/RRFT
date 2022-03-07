import { Link } from 'react-router-dom';
import "./Activities.css"

const Activities = ({ token, activities }) => {

    return <>
        <div className='activities'>
            <h1 className="activities-title">Activities</h1>
            {token && <Link to='/activities/add' className="add-activity-btn">Add Activity</Link>}
            <div className="table-wrapper">
                <table className="activities-table">
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                    </tr>
                    {activities.map((activity) => {
                        const { name, description } = activity
                        return (
                            <tr key={activity.id}>
                                <td>{name}</td>
                                <td>{description}</td>
                            </tr>
                        )
                    })}
                </table>
            </div>
        </div>
    </>
}

export default Activities