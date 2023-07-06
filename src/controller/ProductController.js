const ProductService = require('../services/ProductService')

const createProduct = async (req, res) => {
    try {
        const { name, image, type, price, countInStock, rating, description } = req.body

        if (!name || !image || !type || !price || !countInStock || !rating) {
            return res.status(200).json({
                status: "Error",
                message: "Lỗi"
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




module.exports =
{
    createProduct,
    updateProduct
}