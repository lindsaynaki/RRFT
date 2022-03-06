import { fetchActivities, deletedActivity } from '../api'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { deleteActivity } from '../api';
import "./Activities.css"

const Activities = ({ token, activities, setActivities }) => {

    const handleDelete = async(activityIdToDelete, token) => {
        try{ 
            const deletedActivity = await deleteActivity(activityIdToDelete, token)

            if(deletedActivity) {
                const newActivities = activities.filter(activity => activity.id !== activityIdToDelete);
                setActivities(newActivities)
            }
            
        } catch(error) {
            console.error(error)
        }
    }
    
    return<>
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
                const { name, description} = activity
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