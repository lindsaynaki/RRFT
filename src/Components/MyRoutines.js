import { fetchRoutines } from '../api'
import { useState, useEffect } from 'react'
import { Search } from './index'
import "./Routines.css"
import { Link } from 'react-router-dom';

const MyRoutines = ({ token, user, routines, setRoutines }) => {
    
    const handleRoutines = async () => {
        try {   
            const fetchedRoutines = await fetchRoutines();
            setRoutines(fetchedRoutines)
        } catch(error) {
            console.error(error)
        }
    } 

    useEffect(() => {
        handleRoutines();
    }, [token])

    const filteredRoutines = routines.filter(routine => {
        return routine.creatorName = user.username
        //id
    })

    console.log('filteredRoutines: ', filteredRoutines)

    return (
        <div className="routines">
            <h1>My Routines</h1>
            {token && <Link to='/routines/add' className="add-activity-btn">Add Routine</Link>}
            {filteredRoutines.map((routine) => {
                const { name, goal } = routine;
                return ( <>
                    <div>
                        <h3>Routine</h3>
                                <p>Name: {name}</p>
                                <p>Goal: {goal}</p>
                    </div>
                    {/* <div className="activities">
                    <h3>Activities</h3>
                            {activities && activities.map(({name, description, count, duration}) => {
                                return(
                                    <>
                                    <p>name: {name}</p>
                                    <p>descripiton: {description}</p>
                                    <p>count: {count}</p>
                                    <p>duration: {duration}</p>
                                    </>
                                )
                            })}
                    </div> */}
                    </>
                )
            })}
        </div>
    )
}

export default MyRoutines; 