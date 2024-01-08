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
    const [pictures, setPictures] = useState([])
    const [equipments, setEquipments] = useState([])
    const [tags, setTags] = useState([])

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

    const handleAdd = (e) => {
        e.preventDefault()
        if (e.target.value === 'picture') {
            const input = document.getElementById(`pictures`)
            if(input.value === '') return
            setPictures([...pictures, input.value])
            input.value = ''
        }
    }

    const handleDelete = (e, index) => {
        e.preventDefault()
        if (e.target.value === 'picture') {
            const newPictures = pictures.filter((picture, i) => i !== index)
            setPictures(newPictures)
        }
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
        },
        formPictures: {
            display: 'flex',
            flexDirection: 'row',
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
                            <label htmlFor="pictures">Photos</label>
                            <div style={customStyles.formPictures}>
                                <input type="text" name="pictures" id="pictures" />
                                <Button text="+" value={'picture'} onClick={e => handleAdd(e)} />
                            </div>
                            {
                                pictures.length > 0 &&
                                pictures.map((picture, index) => {
                                    return (
                                        <div key={index} style={customStyles.formPictures}>
                                            <input type="text" name="pictures" id={`picture${index}`} value={picture} readOnly/>
                                            <Button text="-" value={'picture'} onClick={e=> handleDelete(e, index)} />
                                        </div>
                                    )
                                })
                            }

                            <label htmlFor="description">Description</label>
                            <textarea name="description" id="description" cols="30" rows="10"></textarea>
                            <label htmlFor="hostname">Nom de l'hôte</label>
                            <input type="text" name="hostname" id="hostname" />
                            <label htmlFor="hostPicture">Photo de l'hôte</label>
                            <input type="text" name="hostPicture" id="hostPicture" />
                            <label htmlFor="rating">Note</label>
                            <input type="number" name="rating" id="rating" min={0} max={5} />
                            <label htmlFor="location">Localisation</label>
                            <input type="text" name="location" id="location" />
                            <label htmlFor="equipments">Équipements</label>
                            <input type="text" name="equipments" id="equipments" />
                            <label htmlFor="tags">Tags</label>
                            <input type="text" name="tags" id="tags" />
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