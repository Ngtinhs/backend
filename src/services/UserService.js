const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const { genneralAcccessToken, genneralRefreshToken } = require('./JwtService');

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, confirmPassword, phone } = newUser
        try {
            const checkUser = await User.findOne({ email: email })
            if (checkUser !== null) {
                resolve({
                    status: "ERR",
                    message: "Email đã tồn tại",
                })
            }

            const hash = bcrypt.hashSync(password, 10)
            const createdUser = await User.create({
                name,
                email,
                password: hash,
                phone
            })

            if (createdUser) {
                resolve({
                    status: 'OK',
                    message: "Tạo tài khoản thành công",
                    data: createdUser
                })
            }
        } catch (err) {
            reject(err);
        }
    })
}


const loginUser = (UserLogin) => {
    return new Promise(async (resolve, reject) => {
        const { email, password } = UserLogin
        try {
            const checkUser = await User.findOne({ email: email })
            if (checkUser === null) {
                resolve({
                    status: "ERR",
                    message: "Người dùng không tồn tại",
                })
            }
            const comparePassword = bcrypt.compareSync(password, checkUser.password)
            if (!comparePassword) {
                resolve({
                    status: "ERR",
                    message: "Mật khẩu hoặc tài khoản không đúng",
                })
            }

            const access_token = await genneralAcccessToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin,
            })


            const refresh_token = await genneralRefreshToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin,
            })

            resolve({
                status: 'OK',
                message: "Thành công",
                access_token,
                refresh_token
            })
        } catch (err) {
            reject(err);
        }
    })
}


const UpdateUser = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({ _id: id });

            if (checkUser === null) {
                resolve({
                    status: "ERR",
                    message: "Người dùng không tồn tại",
                })
            }

            const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });

            resolve({
                status: 'OK',
                message: "Thành công",
                data: updatedUser
            })
        } catch (err) {
            reject(err);
        }
    })
}

const deleteManyUser = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {

            await User.deleteMany({ _id: ids })
            resolve({
                status: 'OK',
                message: 'Delete user success',
            })
        } catch (e) {
            reject(e)
        }
    })
}


const DeteleUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({ _id: id });

            if (checkUser === null) {
                resolve({
                    status: "ERR",
                    message: "Người dùng không tồn tại",
                })
            }

            await User.findByIdAndDelete(id);

            resolve({
                status: 'OK',
                message: "Thành công",
            })
        } catch (err) {
            reject(err);
        }
    })
}

const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allUser = await User.find();

            resolve({
                status: 'OK',
                message: "Thành công",
                data: allUser
            })
        } catch (err) {
            reject(err);
        }
    })
}

const getDetailsUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({ _id: id });

            if (user === null) {
                resolve({
                    status: "OK",
                    message: "Người dùng không tồn tại",
                })
            }


            resolve({
                status: 'OK',
                message: "Thành công",
                data: user
            })
        } catch (err) {
            reject(err);
        }
    })
}


module.exports =
{
    createUser,
    loginUser,
    UpdateUser,
    DeteleUser,
    getAllUser,
    getDetailsUser,
    deleteManyUser
}
