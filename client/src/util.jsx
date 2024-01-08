import axios from 'axios'

export const getData = async (url) => {
    const res = await axios.get(`http://localhost:9000${url}`)
    const data = res.data
    return data
}

export const getAccomodation = (id, data, setModalData) => {
    const accomodation = data.find((accomodation) => accomodation._id === id)
    setModalData(accomodation)
}