import axios from 'axios'

const api = process.env.REACT_APP_API_URL

export const getData = async (url) => {
    const res = await axios.get(`${api}${url}`)
    const data = res.data
    return data
}

export const getAccomodation = async (id, data) => {
    return await data.find((accomodation) => accomodation._id === id)
    
}

export const postAccomodation = async (token, body, type, id) => {
    let headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": 'application/json'
    }
    if (type === 'add') {
        axios.post(`${api}/accomodation`, body, { headers: headers })
            .then(res => {
                return res.data
            })
            .catch(err => {
                console.log(err)
            })
    }
    if (type === 'edit') {
        axios.patch(`${api}/accomodation/${id}`, body, { headers: headers })
            .then(res => {
                return res.data
            })
            .catch(err => {
                console.log(err)
            })
    }
    if (type === 'delete') {
        axios.delete(`${api}/accomodation/${body.id}`, { headers: headers })
            .then(res => {
                return res.data
            })
            .catch(err => {
                console.log(err)
            })
    }
}