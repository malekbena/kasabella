import axios from 'axios'

export const getData = async (url) => {
    const res = await axios.get(`http://localhost:9000${url}`)
    const data = res.data
    return data
}

export const getAccomodation = async (id, data, setModalData) => {
    const accomodation = await data.find((accomodation) => accomodation._id === id)
    setModalData(accomodation)
}

export const postAccomodation = async (token, body, type) => {
    let headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": 'application/json'
    }
    if (type === 'add') {
        axios.post(`http://localhost:9000/accomodation`, body, { headers: headers })
            .then(res => {
                return res.data
            })
            .catch(err => {
                console.log(err)
            })
    }
    if (type === 'edit') {
        axios.put(`http://localhost:9000/accomodation/${body.id}`, body, { headers: headers })
            .then(res => {
                return res.data
            })
            .catch(err => {
                console.log(err)
            })
    }
    if (type === 'delete') {
        axios.delete(`http://localhost:9000/accomodation/${body.id}`, { headers: headers })
            .then(res => {
                return res.data
            })
            .catch(err => {
                console.log(err)
            })
    }
}