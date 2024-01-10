import axios from 'axios'

export const getData = async (url) => {
    const res = await axios.get(`http://localhost:9000${url}`)
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
        axios.post(`http://localhost:9000/accomodation`, body, { headers: headers })
            .then(res => {
                return res.data
            })
            .catch(err => {
                console.log(err)
            })
    }
    if (type === 'edit') {
        axios.patch(`http://localhost:9000/accomodation/${id}`, body, { headers: headers })
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