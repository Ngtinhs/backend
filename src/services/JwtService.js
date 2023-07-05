const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config()

const genneralAcccessToken = (payload) => {
    console.log("payload: " + payload)
    const access_Token = jwt.sign({
        payload
    }, process.env.ACCESS_TOKEN, { expiresIn: '1h' })
    return access_Token
}

const genneralRefreshToken = (payload) => {
    const refresh_token = jwt.sign({
        payload
    }, process.env.REFRESH_TOKEN, { expiresIn: '365d' })
    return refresh_token
}

module.exports = {
    genneralAcccessToken,
    genneralRefreshToken
}