import { useState, useEffect, useContext } from "react"
import { getData, getAccomodation, postAccomodation } from "../util"
import Cards from "../components/Cards"
import Button from "../components/Button"
import Modal from "react-modal"
import ModalCustom from "../components/ModalCustom"
import { AuthContext } from "../context/AuthContext"

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


    const openModal = (e) => {
        e.preventDefault()
        setModalIsOpen(true)
        setModalType(e.target.value)
        if (e.target.value === 'edit') {
            if (e.target.dataset.id) {
                getAccomodation(e.target.dataset.id, data, setModalData)
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
            if (input.value === '') return
            setPictures([...pictures, input.value])
            input.value = ''
        }
        if (e.target.value === 'equipment') {
            const input = document.getElementById(`equipments`)
            if (input.value === '') return
            setEquipments([...equipments, input.value])
            input.value = ''
        }
        if (e.target.value === 'tag') {
            const input = document.getElementById(`tags`)
            if (input.value === '') return
            setTags([...tags, input.value])
            input.value = ''
        }
    }

    const handleDelete = (e, index) => {
        e.preventDefault()
        if (e.target.value === 'picture') {
            const newPictures = pictures.filter((picture, i) => i !== index)
            setPictures(newPictures)
        }
        if (e.target.value === 'equipment') {
            const newEquipments = equipments.filter((equipment, i) => i !== index)
            setEquipments(newEquipments)
        }
        if (e.target.value === 'tag') {
            const newTags = tags.filter((tag, i) => i !== index)
            setTags(newTags)
        }
    }

    const handleChange = (e) => {
        e.preventDefault()
        setModalData({ ...modalData, [e.target.name]: e.target.value })
    }
    const sendForm = (e) => {
        e.preventDefault()
        let body = {
            "title": modalData.title,
            "cover": modalData.cover,
            "description": modalData.description,
            "location": modalData.location,
            "host": {
                "name": modalData.hostname,
                "picture": modalData.hostPicture
            },
            "rating": modalData.rating,
            "equipments": equipments,
            "tags": tags,
            "pictures": pictures
        }
        
        const token = localStorage.getItem('token')
        postAccomodation(token, body, modalType)
        setModalIsOpen(false)
    }

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <p>Bonjour {user.username}</p>
            <div className="dashboard_titles">
                <h2>Liste des logements</h2>
                <Button value={'add'} text="Ajouter un logement" className="button__add" onClick={e => openModal(e)} />
            </div>
            <ModalCustom
                modalIsOpen={modalIsOpen}
                setModalIsOpen={setModalIsOpen}
                closeModal={closeModal}
                modalType={modalType}
                modalData={modalData}
                pictures={pictures}
                equipments={equipments}
                tags={tags}
                handleAdd={handleAdd}
                handleDelete={handleDelete}
                onChange={handleChange}
                sendForm={sendForm}
            />            
            {
                isLoaded && data &&
                <Cards accomodations={data} isAdmin onClick={e => openModal(e)} />
            }
        </div>
    )
}

export default Dashboard