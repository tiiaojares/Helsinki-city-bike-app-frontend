import { useNavigate } from 'react-router-dom';



    



const NewStation = () => {

    const navigate = useNavigate();

    return (
    <div> 
        <h2> Luo uusi asema: </h2>


    <nav className="navbar fixed-bottom navbar-dark bg-dark">
        <div className="container"> 
        <a 
            className="navbar-brand bottom"
            onClick={() => navigate(-1)}>
            Takaisin
        </a>
        </div>
    </nav>
    </div>
    )
}

export { NewStation }