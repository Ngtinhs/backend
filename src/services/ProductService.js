const Product = require('../models/ProductModel');

const createProduct = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const { name, image, type, price, countInStock, rating, description, discount } = newProduct

        try {
            const checkProduct = await Product.findOne({ name: name })
            if (checkProduct !== null) {
                resolve({
                    status: "OK",
                    message: "Tên sản phẩm đã tồn tại",
                })
            }

            const createProduct = await Product.create({
                name,
                image,
                type,
                countInStock: Number(countInStock),
                price,
                rating,
                description,
                discount: Number(discount),
            })

            if (createProduct) {
                resolve({
                    status: 'OK',
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
                    status: "OK",
                    message: "Sản phẩm không tồn tại",
                })
            }

            const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true });

            resolve({
                status: 'OK',
                message: "Thành công",
                data: updatedProduct
            })
        } catch (err) {
            reject(err);
        }
    })
}

const deleteManyProduct = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Product.deleteMany({ _id: ids })
            resolve({
                status: 'OK',
                message: 'Delete product success',
            })
        } catch (e) {
            reject(e)
        }
    })
}


const getDetailsProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const dataProduct = await Product.findOne({ _id: id });

            if (dataProduct === null) {
                resolve({
                    status: "ok",
                    message: "Sản phẩm không tồn tại",
                })
            }
            resolve({
                status: 'Ok',
                message: "Thành công",
                data: dataProduct
            })
        } catch (err) {
            reject(err);
        }
    })
}


const getAllProduct = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalProduct = await Product.count()
            let allProduct = []
            if (filter) {
                const label = filter[0];
                const allObjectFilter = await Product.find({ [label]: { '$regex': filter[1] } }).limit(limit).skip(page * limit).sort({ createdAt: -1, updatedAt: -1 })
                resolve({
                    status: 'OK',
                    message: 'Success',
                    data: allObjectFilter,
                    total: totalProduct,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalProduct / limit)
                })
            }
            if (sort) {
                const objectSort = {}
                objectSort[sort[1]] = sort[0]
                const allProductSort = await Product.find().limit(limit).skip(page * limit).sort(objectSort).sort({ createdAt: -1, updatedAt: -1 })
                resolve({
                    status: 'OK',
                    message: 'Success',
                    data: allProductSort,
                    total: totalProduct,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalProduct / limit)
                })
            }
            if (!limit) {
                allProduct = await Product.find().sort({ createdAt: -1, updatedAt: -1 })
            } else {
                allProduct = await Product.find().limit(limit).skip(page * limit).sort({ createdAt: -1, updatedAt: -1 })
            }
            resolve({
                status: 'OK',
                message: 'Success',
                data: allProduct,
                total: totalProduct,
                pageCurrent: Number(page + 1),
                totalPage: Math.ceil(totalProduct / limit)
            })
        } catch (e) {
            reject(e)
        }
    })
}

const DeleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({ _id: id });

            if (checkProduct === null) {
                resolve({
                    status: "OK",
                    message: "Người dùng không tồn tại",
                })
            }

            await Product.findByIdAndDelete(id);

            resolve({
                status: 'OK',
                message: "Thành công",
            })
        } catch (err) {
            reject(err);
        }
    })
}


const getAllType = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allType = await Product.distinct('type')
            resolve({
                status: 'OK',
                message: 'Success',
                data: allType,
            })
        } catch (e) {
            reject(e)
        }
    })
}


module.exports =
{
    createProduct,
    UpdateProduct,
    getDetailsProduct,
    getAllProduct,
    DeleteProduct,
    deleteManyProduct,
    getAllType
}
