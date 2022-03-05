import { fetchRoutines } from '../api'
import { useState, useEffect } from 'react'
import Routine from './Routine';
import "./Routines.css"

const Routines = ({token, user, routines, setRoutines, activities, setActivities}) => {


    // const handleRoutines = async () => {
    //     try {   
    //         const fetchedRoutines = await fetchRoutines();
    //         setRoutines(fetchedRoutines)
    //     } catch(error) {
    //         console.error(error)
    //     }
    // } 

    const handleDelete = async() => {
        try {

        } catch(error) {
            console.error(error)
        }
    }

    useEffect(() => {
        // handleRoutines();
    }, [token])


    return <>
        <div className="routines">
            <h1>Routines</h1>
                {/* {<Routine routine={routine} />} */}
                {routines.map((routine) => { 
                    return ( 
                        <Routine routine={routine}/>
                    )
                })}
                {/* {routines.map((routine) => {
                    const{ creatorName, name, goal, activities } = routine
                    console.log('activties: ', activities )
                    return (
                        <div key={routine.id} className="eachRoutine" >
                            <h3>Routine</h3>
                                <p>Name: {name}</p>
                                <p>Goal: {goal}</p>
                            
                            <div className="activities">
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
                            </div>
                            <h3>Created By</h3>
                            {creatorName}
                            <p>{creatorName === user.username && <button className="delete-btn" onClick={() => handleDelete()}>Delete</button>}</p>
                        </div>
                    );
                })} */}
        </div>
    </>

}

export default Routines;