const jwt = require('jsonwebtoken')
require('dotenv').config({ path: '.env.local' })
const fs = require('fs')


const pvt_key = fs.readFileSync('./keys/jwtRS256.key', 'utf8')
const pub_key = fs.readFileSync('./keys/jwtRS256.key.pub', 'utf8')

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