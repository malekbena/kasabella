const jwt = require('jsonwebtoken')
require('dotenv').config({ path: '.env' })



const privateKey = process.env.PRIVATE_KEY
const publicKey = process.env.PUBLIC_KEY

function verifyAccessToken(token) {
    try {
        const decoded = jwt.verify(token, privateKey, { algorithms: 'RS256' });
        if (decoded.user.isAdmin === false) {
            return { success: false, error: 'You are not authorized to perform this action' };
        }
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