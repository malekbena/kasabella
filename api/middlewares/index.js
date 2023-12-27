const jwt = require('jsonwebtoken')
require('dotenv').config({ path: '.env.local' })

const pvt_key = process.env.PRIVATE_KEY
const pub_key = process.env.PUBLIC_KEY

// const payload = {
//     message : "Hi friends !"
// }


// const accessTokenSecret = JWT.sign(payload, pvt_key, { algorithm: 'RS256' })

// const decode = JWT.verify(accessTokenSecret, pub_key, {
//     algorithms: 'RS256'
// })

// const checkToken = (req, res, next) => {
// const authHeader = req.headers.authorization
// if (authHeader) {
//     const token = authHeader.split(' ')[1]
//     JWT.verify(token, pvt_key, (err) => {
//         if (err) {
//             return res.sendStatus(403)
//         }
//         console.log('chekToken success')
//         next()
//     })
// } else {
//     res.sendStatus(401)
// }
// }
function verifyAccessToken(token) {

    try {
        const decoded = jwt.verify(token, pvt_key, { algorithms: 'RS256' });
        return { success: true, data: decoded };
    } catch (error) {
        return { success: false, error: error.message };
    }
}
module.exports = function (req, res, next) {
    const authHeader = req.headers.authorization
    const token = authHeader.split(' ')[1];
    const decoded = verifyAccessToken(token);
    if (!decoded.success) {
        return res.status(401).json({ message: decoded.error });
    }
    next()
}