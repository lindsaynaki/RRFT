import './Home.css'

const Home = ({ user, token }) => {

    return (
        <div className="home">
            {token ? <h1>Welcome to Fitness Trac.kr, {user.username}</h1> :
                <h2>Welcome to Fitness Trac.kr</h2>}
        </div>
    )
}

export default Home;