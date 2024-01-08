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

export const postAccomodation = async (token, body, type) => {
    let headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": 'application/json'
    }
    axios.post(`http://localhost:9000/accomodation`, body, { headers: headers })
        .then(res => {
            return res.data
        })
        .catch(err => {
            console.log(err)
        })
}