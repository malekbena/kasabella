import { useState, useEffect, useContext } from "react"
import { getData } from "../util"
import Cards from "../components/Cards"
import Button from "../components/Button"
import { AuthContext } from "../context/AuthContext"
import Modal from "react-modal"

const Dashboard = () => {
    const [data, setData] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [modalType, setModalType] = useState('')
    const [modalData, setModalData] = useState({})

    const { user } = useContext(AuthContext)
    Modal.setAppElement('#root')

    useEffect(() => {
        getData('/accomodations').then((data) => {
            setData(data.accomodations)
            setIsLoaded(true)
        })
    }, []);


    const getAccomodation = (id) => {
        const accomodation = data.find((accomodation) => accomodation._id === id)
        setModalData(accomodation)
    }

    const openModal = (e) => {
        e.preventDefault()
        setModalIsOpen(true)
        setModalType(e.target.value)
        if (e.target.value === 'edit') {
            if (e.target.dataset.id) {
                getAccomodation(e.target.dataset.id)
            }
        }
    }
    const closeModal = (e) => {
        e.preventDefault()
        setModalIsOpen(false)
    }
    const customStyles = {
        content: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',

        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        }
    }

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <p>Bonjour {user.username}</p>
            <div className="dashboard_titles">
                <h2>Liste des logements</h2>
                <Button value={'add'} text="Ajouter un logement" className="button__add" onClick={e => openModal(e)} />
            </div>
            <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} className="modal" style={customStyles}>
                {modalType === 'add' && (
                    <>
                        <h2>Ajouter un logement</h2>
                        <form style={customStyles.form}>
                            <label htmlFor="title">Titre</label>
                            <input type="text" name="title" id="title" />
                            <label>Cover</label>
                            <input type="text" name="cover" id="cover" />
                            <label htmlFor="description">Description</label>
                            <textarea name="description" id="description" cols="30" rows="10"></textarea>
                            <Button text="Ajouter" className="button__add" />
                            <Button text="Annuler" onClick={e => closeModal(e)} />
                        </form>
                    </>
                )}
                {modalType === 'edit' && (
                    <>
                        <h2>Modifier un logement</h2>
                        <form style={customStyles.form}>
                            <label htmlFor="title">Titre</label>
                            <input type="text" name="title" id="title" defaultValue={modalData.title} />
                            <label htmlFor="description">Description</label>
                            <textarea name="description" id="description" cols="30" rows="10" defaultValue={modalData.description}></textarea>
                            <Button text="Modifier" />
                            <Button text="Annuler" onClick={e => closeModal(e)} />
                        </form>
                    </>
                )}
                {modalType === 'delete' && (
                    <>
                        <h2>Supprimer un logement</h2>
                        <p>Êtes-vous sûr de vouloir supprimer ce logement ?</p>
                        <Button text="Supprimer" />
                        <Button text="Annuler" onClick={e => closeModal(e)} />
                    </>
                )}
            </Modal>
            {
                isLoaded && data &&
                <Cards accomodations={data} isAdmin onClick={e => openModal(e)} />
            }
        </div>
    )
}

export default Dashboard