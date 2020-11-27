import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'


const getProducts = asyncHandler(async (req, res) => {

    console.log(req.params)

    const keyword = req.query.keyword ? {
        
        name:{
            $regex: req.query.keyword,
            $options:'i'
        },
    
    }:{}

    const products = await Product.find({...keyword})
    res.json(products)
})



const getProductsById = asyncHandler(async (req, res) => {


    const product = await Product.findById(req.params.id)

    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }

})

const getProductsCategory = asyncHandler(async (req, res) => {

    const pageSize = 6
    const page = Number(req.query.pageNumber) || 1

    const count = await Product.countDocuments({category:req.params.category})

    const products = await Product.find({category:req.params.category}).limit(pageSize).skip(pageSize * (page-1))

    if (products) {
        res.json({products,page,pages:Math.ceil(count / pageSize)})
    } else {
        res.status(404)
        throw new Error('Product not found')
    }

})



const deleteProduct = asyncHandler(async (req, res) => {

    const product = await Product.findById(req.params.id)

    if (product) {
        await product.remove()
        res.json({
            message: 'Product removed'
        })
    } else {
        res.status(404)
        throw new Error('Product not found')
    }

})


const createProduct = asyncHandler(async (req, res) => {

    const product = new Product({
        name: 'sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'sample brand',
        category: 'sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'sample description'

    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)

})


const updateProduct = asyncHandler(async (req, res) => {

    const {
        name,
        price,
        description,
        image,
        brand,
        category,
        countInStock,
    } = req.body

    const product = await Product.findById(req.params.id)

    if (product) {
        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.countInStock = countInStock
        product.brand = brand
        product.category = category


        const updatedProduct = await product.save()
        res.json(updatedProduct)
    } else {
        res.status(404)
        throw new Error('product not found')
    }
})



const createProductReview = asyncHandler(async (req, res) => {

    const {rating,comment} = req.body

    const product = await Product.findById(req.params.id)

    if (product) {
        const alreadyReviewed = product.reviews.find((r) => r.user.toString() === req.user._id.toString())

        if(alreadyReviewed){
            res.status(400)
            throw new Error('Product already reviewed')
        }

        const review = {
            name:req.user.name,
            rating:Number(rating),
            comment:comment,
            user:req.user._id
        }

        product.reviews.push(review)
        product.numReviews = product.reviews.length
        product.rating = product.reviews.reduce((acc,item) => item.rating+ acc,0)/product.reviews.length
         
        await product.save()
        res.status(201).json({
            message:'reviews added'
        })

    } else {
        res.status(404)
        throw new Error('product not found')
    }



})

export { getProducts, getProductsById, deleteProduct,createProduct,updateProduct,createProductReview,getProductsCategory}