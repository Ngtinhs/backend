const jwt = require('jsonwebtoken');

const genneralAcccessToken = (payload) => {
    console.log("payload: " + payload)
    const access_Token = jwt.sign({
        payload
    }, 'access_token', { expiresIn: '1h' })
    return access_Token
}

const genneralRefreshToken = (payload) => {
    const access_Token = jwt.sign({
        payload
    }, 'access_token', { expiresIn: '365d' })
    return access_Token
}

module.exports = {
    genneralAcccessToken,
    genneralRefreshToken
}