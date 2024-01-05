import { useState, useEffect, useContext } from "react"
import { getData } from "../util"
import Cards from "../components/Cards"
import Button from "../components/Button"
import { AuthContext } from "../context/AuthContext"

const Dashboard = () => {
    const [data, setData] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    const {user} = useContext(AuthContext)

    useEffect(() => {
        getData('/accomodations').then((data) => {
            setData(data.accomodations)
            setIsLoaded(true)
        })
    }, []);

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <p>Bonjour {user.username}</p>
            <div className="dashboard_titles">
                <h2>Liste des logements</h2>
                <Button text="Ajouter un logement" className="button__add" />
            </div>
            {
                isLoaded && data &&
                <Cards accomodations={data} isAdmin />
            }
        </div>
    )
}

export default Dashboard