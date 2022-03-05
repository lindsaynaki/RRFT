import { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { Home, Routines, Activities, Login, Register, AddActivity, AddRoutine, MyRoutines } from './Components'
import { getUser, fetchRoutines, fetchActivities } from './api';
import { ToastContainer } from 'react-toastify';
import './App.css'

function App() {
  const [token, setToken] = useState('')
  const [user, setUser] = useState([])
  const [ routines, setRoutines ] = useState([]);
  const [activities, setActivities] = useState([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [routineName, setRoutineName] = useState('');
  const [goal, setGoal] = useState('')
  const [isPublic, setIsPublic] = useState(false)
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

  useEffect(() => {
    if (token) {
      handleUser();
    }
  }, [token])

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'))
    }
  }, [])

  useEffect(() => {
    handleRoutines();
    handleActivities();
  }, [])


  return (
    <div className="App">
      <header>
      <h1>Fitness Trac.kr</h1>
        <nav>
          <Link to='/'>Home</Link>
          {token && <Link to='/myroutines'>My Routines</Link>}
          <Link to='/routines'>Routines</Link>
          <Link to='/activities'>Activities</Link>
          {!token && <Link to='/login'>Login</Link>}
          {!token && <Link to='/register'>Register</Link>}
          {token && <button className="logout-btn" onClick={handleLogOut} >Log Out</button>}
        </nav>
      </header>

      <Routes>
          <Route path='/' element = {<Home user={user} token={token}/>} />
          <Route path='/routines' element={<Routines 
            token={token}
            user={user}
            routines={routines}
            setRoutines={setRoutines}
          />} />
          <Route path='/myroutines' element={<MyRoutines 
            user={user}
            token={token}
            routines={routines}
            setRoutines={setRoutines}
          />} />
          <Route path='/activities' element={<Activities 
            token={token}
            activities={activities}
            setActivities={setActivities}
          />} />
          <Route path='/login' element={<Login token={token} setToken={setToken} />}/>
          <Route path='/register' element={<Register token={token} setToken={setToken} />} />
          <Route path='/activities/add' element={<AddActivity 
            token={token}
            activities={activities}
            setActivities={setActivities}
            name={name}
            setName={setName}
            description={description}
            setDescription={setDescription}
          />} />
          <Route path='/routines/add' element={<AddRoutine
            token={token}
            user={user}
            routines={routines}
            setRoutines={setRoutines}
            activities={activities}
            setActivities={setActivities}
            routineName={routineName}
            setRoutineName={setRoutineName}
            goal={goal}
            setGoal={setGoal}
            isPublic={isPublic}
            setIsPublic={setIsPublic}
            handleRoutines={handleRoutines}
          />} />
        </Routes>
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
    </div>
  );
}

export default App;
