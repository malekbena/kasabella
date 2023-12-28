import axios from 'axios'

export const getData = async (url) => {
    const res = await axios.get(`http://localhost:9000${url}`)
    const data = res.data
    return data
}

