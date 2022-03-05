import { fetchActivities, deletedActivity } from '../api'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { deleteActivity } from '../api';
import "./Activities.css"



const Activities = ({ token, activities, setActivities }) => {

    const handleActivities = async() => {
        try{
            const fetchedActivities = await fetchActivities()
            setActivities(fetchedActivities)
        } catch(error) {
            console.error(error)
        }
    }

    console.log('activities: ', activities)
    
    useEffect(() => {
        handleActivities()
    }, [token])

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
            <h1>Activities</h1>
            {token && <Link to='/activities/add'>Add Activity</Link>}
            {activities.map((activity) => {
                const { name, description} = activity
                return (
                    <div className='eachActivity' key={activity.id}>
                        <p>name: {name}</p>
                        <p>descripiton: {description}</p>
                    </div>
                )
            })}
        </div>
    </>
}

export default Activities