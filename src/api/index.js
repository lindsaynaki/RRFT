import axios from 'axios'; 

const BASE_URL = "https://shrouded-crag-86388.herokuapp.com/api"

export const fetchRoutines = async () => {
    try { 
        const { data } = await axios.get(`${BASE_URL}/routines`)
        console.log('data: ', data)
        return data;
    } catch(error) {
        console.error(error)
    }
};

export const fetchActivities = async () => {
    try{
        const { data } = await axios.get(`${BASE_URL}/activities`)
        console.log('activities data', data)
        return data;
    }catch(error) {
        throw error;
    }
}

export const login = async (username, password) => {
    try {
        const { data: {token} } = await axios.post(`${BASE_URL}/users/login`, {
            username, 
            password
        })
        console.log('token: ', token)
        return token;
    } catch(error) {
       throw error;
    }
}

export const register = async (username, password) => {
    try {
        const { data: {token} } = await axios.post(`${BASE_URL}/users/register`, {
            username, 
            password
        })
        console.log('token: ', token)
        return token;
    }
    catch(error) {
        throw error;
    }
}

export const getUser = async(token) => {
    try {
        const { data }  = await axios.get(`${BASE_URL}/users/me`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        console.log('data: ', data)
        return data;
    } catch(error) {
        throw error;
    }
}

// export const addActivity = async (token, name, description) => {
//     try{
//         const { data } = await axios.post(`${BASE_URL}/activities`, 
//         {
//             headers: {
//                'Authorization': `Bearer ${token}`
//         },
//             body: { name, 
//             description}
//         })
//         console.log('data: ', data)
//         return data
//     } catch(error) {
//         throw error;
//     }
// }

export const deleteActivity = async(activityId, token) => {
    try {
        const { data } = await axios.delete(`${BASE_URL}/activities/${activityId}`, {
            activityId,
            token
        })
        console.log('deleted activity: ', data)
        return data
    } catch(error) {
        throw error;
    }
}

// export const addRoutine = async (token, id, isPublic, routineName, goal) => {
//     try{ 
//         const data = await axios.post(`${BASE_URL}/routines`, 
//             {
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 }
//             },
//                { 
//                 id,
//                 isPublic,
//                 routineName,
//                 goal}
//             )

//         console.log('data: ', data)
//         return data;
//     } catch(error) {    
//         throw error;
//     }
// }

export const addRoutine = async (token, isPublic, name, goal) => {
    try {
      const response = await fetch(`${BASE_URL}/routines`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          isPublic,
          name,
          goal
        }),
      });
    const routine = await response.json();
      console.log('routine: ', routine);
      return routine;
    } catch (error) {
      throw error;
    }
  };

  export const addActivity = async (token, name, description) => {
    try {
      const response = await fetch(`${BASE_URL}/activities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          description
        }),
      });
      const activities = await response.json();
      console.log('activities: ', activities);
      return activities;
    } catch (error) {
      throw error;
    }
  };