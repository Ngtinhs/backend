const Product = require('../models/ProductModel');

const createProduct = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const { name, image, type, price, countInStock, rating, description } = newProduct

        try {
            const checkProduct = await Product.findOne({ name: name })
            if (checkProduct !== null) {
                resolve({
                    status: "ok",
                    message: "Tên sản phẩm đã tồn tại",
                })
            }

            const createProduct = await Product.create({
                name,
                image,
                type,
                price,
                countInStock,
                rating,
                description
            })

            if (createProduct) {
                resolve({
                    status: 'Ok',
                    message: "Thêm sản phẩm thành công",
                    data: createProduct
                })
            }
        } catch (err) {
            reject(err);
        }
    })
}


const UpdateProduct = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({ _id: id });

            if (checkProduct === null) {
                resolve({
                    status: "ok",
                    message: "Người dùng không tồn tại",
                })
            }

            const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true });

            resolve({
                status: 'Ok',
                message: "Thành công",
                data: updatedProduct
            })
        } catch (err) {
            reject(err);
        }
    })
}


module.exports =
{
    createProduct,
    UpdateProduct
}
