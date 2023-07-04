const User = require('../models/UserModel');


const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, confirmPassword, phone } = newUser
        try {
            const checkUser = await User.findOne({ email: email })
            if (checkUser !== null) {
                resolve({
                    status: "ok",
                    message: "Email đã tồn tại",
                })
            }
            const createdUser = await User.create({
                name, email, password, confirmPassword, phone
            })

            if (createdUser) {
                resolve({
                    status: 'Ok',
                    message: "User created successfully",
                    data: createdUser
                })
            }
        } catch (err) {
            reject(err);
        }
    })
}

module.exports = { createUser }
