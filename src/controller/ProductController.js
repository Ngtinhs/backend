const ProductService = require('../services/ProductService')

const createProduct = async (req, res) => {
    try {
        const { name, image, type, price, countInStock, rating, description } = req.body

        if (!name || !image || !type || !price || !countInStock || !rating) {
            return res.status(200).json({
                status: "ERR",
                message: "Lỗiiii"
            })
        }
        const response = await ProductService.createProduct(req.body)
        return res.status(200).json(response)
    } catch (err) {
        return res.status(404).json({ message: err.message });
    }
}

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id
        const data = req.body
        if (!productId) {
            return res.status(404).json({ message: "ProductID not found" })
        }

        const response = await ProductService.UpdateProduct(productId, data)
        return res.status(200).json(response)
    } catch (err) {
        return res.status(404).json({ message: err });
    }
}

const getDetailsProduct = async (req, res) => {
    try {
        const productId = req.params.id
        if (!productId) {
            return res.status(404).json({ message: "ProductId not found" })
        }

        const response = await ProductService.getDetailsProduct(productId)
        return res.status(200).json(response)
    } catch (err) {
        return res.status(404).json({ message: err });
    }
}

const getAllProduct = async (req, res) => {
    try {
        const { limit, page, sort, filter } = req.query
        const response = await ProductService.getAllProduct(Number(limit) || 8, Number(page) || 0, sort, filter)
        return res.status(200).json(response)
    } catch (err) {
        return res.status(404).json({ message: err });
    }
}


const deleteProduct = async (req, res) => {
    try {
        const ProductId = req.params.id
        if (!ProductId) {
            return res.status(404).json({ message: "ProductId not found" })
        }

        const response = await ProductService.DeleteProduct(ProductId)
        return res.status(200).json(response)
    } catch (err) {
        return res.status(404).json({ message: err });
    }
}

const deleteMany = async (req, res) => {
    try {
        const ids = req.body.ids
        if (!ids) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The ids is required'
            })
        }
        const response = await ProductService.deleteManyProduct(ids)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}





module.exports =
{
    createProduct,
    updateProduct,
    getDetailsProduct,
    getAllProduct,
    deleteProduct,
    deleteMany
}