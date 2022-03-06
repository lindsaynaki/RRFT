import { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
// import { Home, Routines, Activities, Login, Register, AddActivity, AddRoutine, MyRoutines } from './Components'
import { Home, AddActivity, Login, Register, Routines, AddRoutine, Activities, MyRoutines, UpdateRoutineForm } from './Components';
import { getUser, fetchRoutines, fetchActivities } from './api';
import { ToastContainer } from 'react-toastify';
import './App.css'

function App() {
  const [token, setToken] = useState('')
  const [user, setUser] = useState([])
  const [routines, setRoutines] = useState([]);
  const [activities, setActivities] = useState([])
  const navigate = useNavigate();

  const handleUser = async () => {
    if (token) {
      const userObject = await getUser(token)
      setUser(userObject)
    }
  }

  const handleRoutines = async () => {
    const fetchedRoutines = await fetchRoutines();
    setRoutines(fetchedRoutines);
  }

  const handleActivities = async () => {
    const fetchedActivities = await fetchActivities();
    setActivities(fetchedActivities);
  }

  const handleLogOut = () => {
    setToken('')
    localStorage.removeItem('token')
    navigate('/login')
  }

  //sets the new user object in the state once a new user logs in
  useEffect(() => {
    if (token) {
      handleUser();
    }
  }, [token])

  useEffect(() => {
    //sets routine and activities on page load
    handleRoutines();
    handleActivities();
    //sets token on page load
    if (localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'))
    }
  }, [])


  return (
    <div className="App">
      <header>
        <nav>
        <Link to='/' className="main-title navbar-item">Fitness Trac.kr</Link>
          <Link to='/' className="navbar-item">Home</Link>
          {token && <Link to='/myroutines' className="navbar-item">My Routines</Link>}
          <Link to='/routines' className="navbar-item">Routines</Link>
          <Link to='/activities' className="navbar-item">Activities</Link>
          {!token && <Link to='/login' className="navbar-item">Login</Link>}
          {!token && <Link to='/register' className="navbar-item">Register</Link>}
          {token && <button className="logout-btn" onClick={handleLogOut} >Log Out</button>}
        </nav>
      </header>

      <Routes>
        <Route path='/' element={<Home user={user} token={token} />} />
        <Route path='/routines' element={<Routines
          token={token}
          user={user}
          routines={routines}
          setRoutines={setRoutines}
          handleRoutines={handleRoutines}
        />} />
        <Route path='/myroutines' element={<MyRoutines
          user={user}
          token={token}
          routines={routines}
        />} />
        <Route path='/activities' element={<Activities
          token={token}
          activities={activities}
          setActivities={setActivities}
        />} />
        <Route path='/login' element={<Login token={token} setToken={setToken} />} />
        <Route path='/register' element={<Register token={token} setToken={setToken} />} />
        <Route path='/activities/add' element={<AddActivity
          token={token}
          activities={activities}
          setActivities={setActivities}
        />} />
        <Route path='/routines/add' element={<AddRoutine
          token={token}
          user={user}
          routines={routines}
          setRoutines={setRoutines}
          handleRoutines={handleRoutines}
        />} />
        <Route path='/routines/:routineId/update' element={<UpdateRoutineForm
          token={token}
          user={user}
          routines={routines}
          setRoutines={setRoutines}
          handleRoutines={handleRoutines}
        />} />

      </Routes>
      {/* <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        /> */}
    </div>
  );
}

export default App;
