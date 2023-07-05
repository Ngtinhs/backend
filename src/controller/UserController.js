const UserService = require('../services/UserService')

const createUser = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, phone } = req.body
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckEmail = reg.test(email)
        if (!name || !email || !password || !confirmPassword || !phone) {
            return res.status(200).json({
                status: "Error",
                message: "Lỗi"
            })
        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: "Error",
                message: "Lỗi nhập email"
            })
        } else if (password !== confirmPassword) {
            return res.status(200).json({
                status: "Error",
                message: "Xác nhận mật khẩu không khớp"
            })
        }
        const response = await UserService.createUser(req.body)
        return res.status(200).json(response)
    } catch (err) {
        return res.status(404).json({ message: err.message });
    }
}


const loginUser = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, phone } = req.body
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckEmail = reg.test(email)
        if (!name || !email || !password || !confirmPassword || !phone) {
            return res.status(200).json({
                status: "Error",
                message: "Lỗi"
            })
        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: "Error",
                message: "Lỗi nhập email"
            })
        }
        const response = await UserService.loginUser(req.body)
        return res.status(200).json(response)
    } catch (err) {
        return res.status(404).json({ message: err.message });
    }
}


const UpdateUser = async (req, res) => {
    try {
        const userId = req.params.id
        const data = req.body
        if (!userId) {
            return res.status(404).json({ message: "UserID not found" })
        }

        const response = await UserService.UpdateUser(userId, data)
        return res.status(200).json(response)
    } catch (err) {
        return res.status(404).json({ message: err });
    }
}

const DeteleUser = async (req, res) => {
    try {
        const userId = req.params.id
        if (!userId) {
            return res.status(404).json({ message: "UserID not found" })
        }

        const response = await UserService.DeteleUser(userId)
        return res.status(200).json(response)
    } catch (err) {
        return res.status(404).json({ message: err });
    }
}


module.exports =
{
    createUser,
    loginUser,
    UpdateUser,
    DeteleUser
}