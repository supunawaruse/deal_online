import express from 'express'
import { getProducts, getProductsById, deleteProduct, updateProduct, createProduct,createProductReview,getProductsCategory} from '../controllers/productController.js'
import { protect, admin } from '../middleware/authMiddelware.js'

const router = express.Router()
router.route('/category/:category').get(getProductsCategory)
router.route('/').get(getProducts).post(protect, admin, createProduct)
router.route('/:id/reviews').post(protect,createProductReview)
router.route('/:id').get(getProductsById).delete(protect, admin, deleteProduct).put(protect, admin, updateProduct)


export default router 