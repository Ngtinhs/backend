const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config()

const genneralAcccessToken = async (payload) => {
    const access_Token = jwt.sign({
        ...payload
    }, process.env.ACCESS_TOKEN, { expiresIn: '30s' })
    return access_Token
}

const genneralRefreshToken = async (payload) => {
    const refresh_token = jwt.sign({
        ...payload
    }, process.env.REFRESH_TOKEN, { expiresIn: '365d' })
    return refresh_token
}



const refreshTokenJwtService = (token) => {
    return new Promise((resolve, reject) => {
        try {
            jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
                if (err) {
                    resolve({
                        status: "Error",
                        message: "The authentication token",
                    })
                }
                const access_token = await genneralAcccessToken({
                    id: user?.id,
                    isAdmin: user?.isAdmin
                })
                resolve({
                    status: 'Ok',
                    message: "Thành công",
                    access_token
                })
            })

        } catch (err) {
            reject(err);
        }
    })
}




module.exports = {
    genneralAcccessToken,
    genneralRefreshToken,
    refreshTokenJwtService
}