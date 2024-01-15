import { useState, useEffect, useContext } from "react"
import { getData, getAccomodation, postAccomodation } from "../util"
import Cards from "../components/Cards"
import Button from "../components/Button"
import ModalForm from "../components/ModalForm"
import { AuthContext } from "../context/AuthContext"
import { createPortal } from "react-dom"

const Dashboard = () => {
    const [data, setData] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [modalType, setModalType] = useState('')
    const [modalData, setModalData] = useState({})
    const [pictures, setPictures] = useState([])
    const [equipments, setEquipments] = useState([])
    const [tags, setTags] = useState([])
    const [host, setHost] = useState({})
    const [id, setId] = useState('')
    const [message, setMessage] = useState('')

    const { user } = useContext(AuthContext)

    useEffect(() => {
        getData('/accomodations').then((data) => {
            setData(data.accomodations)
            setIsLoaded(true)
        })
    }, []);

    useEffect(() => {
        if (!modalIsOpen) {
            getData('/accomodations').then((data) => {
                setData(data.accomodations)
                setIsLoaded(true)
            })
        }
    }, [modalIsOpen, data]);

    useEffect(() => {
        const handleEscapeKey = (event) => {
            if (event.code === 'Escape') {
                closeModal(event)
            }
        }

        document.addEventListener('keydown', handleEscapeKey)
        return () => document.removeEventListener('keydown', handleEscapeKey)
    }, [])

    useEffect(() => {
        if (message) {
            setTimeout(() => {
                setMessage('')
            }, 3000)
        }
    }, [message])

    const openModal = (e) => {
        e.preventDefault()
        setModalType(e.target.value)
        if (e.target.value === 'add') {
            setModalData({})
            setPictures([])
            setEquipments([])
            setTags([])
            setHost({})
            setModalIsOpen(true)
        }
        if (e.target.value === 'edit') {
            getAccomodation(e.target.dataset.id, data)
                .then((res) => {
                    setModalData(res)
                    setPictures(res.pictures)
                    setEquipments(res.equipments)
                    setTags(res.tags)
                    setHost(res.host)
                    setId(res._id)
                    setModalIsOpen(true)
                })
            setModalIsOpen(true)
        }
        if (e.target.value === 'delete') {
            setId(e.target.dataset.id)
            setModalIsOpen(true)
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
        if (e.target.name === 'hostname') {
            setHost({ ...host, name: e.target.value })
        }
        if (e.target.name === 'hostPicture') {
            setHost({ ...host, picture: e.target.value })
        } else {
            setModalData({ ...modalData, [e.target.name]: e.target.value })
        }
    }

    const sendForm = (e) => {
        e.preventDefault()
        const token = localStorage.getItem('token')
        if (modalType === 'delete') {
            postAccomodation(token, { id }, modalType)
            setMessage('Logement supprimé')
        }
        let body = {
            "title": modalData.title,
            "cover": modalData.cover,
            "description": modalData.description,
            "location": modalData.location,
            "host": {
                "name": host.name,
                "picture": host.picture
            },
            "rating": modalData.rating,
            "equipments": equipments,
            "tags": tags,
            "pictures": pictures
        }
        if (modalType === 'edit') {
            postAccomodation(token, body, modalType, id)
            setMessage('Logement modifié')

        }
        if (modalType === 'add') {
            postAccomodation(token, body, modalType)
            setMessage('Logement ajouté')
        }
        closeModal(e)
    }

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <p>Bonjour {user.username}</p>
            <div className="dashboard_titles">
                <h2>Liste des logements</h2>
                {
                    message &&
                    <p className="dashboard__message">{message}</p>
                }
                <Button value={'add'} text="Ajouter un logement" className="button-hover" onClick={e => openModal(e)} />
            </div>
            {
                createPortal(<ModalForm
                    isOpen={modalIsOpen}
                    closeModal={closeModal}
                    modalData={modalData}
                    modalType={modalType}
                    pictures={pictures}
                    equipments={equipments}
                    tags={tags}
                    host={host}
                    handleAdd={handleAdd}
                    handleDelete={handleDelete}
                    onChange={handleChange}
                    sendForm={sendForm}
                />, document.body)}
            {
                isLoaded && data &&
                <Cards accomodations={data} isAdmin onClick={e => openModal(e)} />
            }
        </div>
    )
}

export default Dashboard