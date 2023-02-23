const express=require('express')
const path=require('path')
//const rootDir=require('../utils/path')
//const adminData=require('./admin')
const productsController=require('../controllers/product')
const router=express.Router()
router.get('/',productsController.getIndex)
router.get('/product',productsController.getProducts)
router.get('/products/:productId',productsController.getProduct)
router.get('/cart',productsController.getCart)
router.post('/cart',productsController.postCart)

router.get('/checkout',productsController.getCheckout)

module.exports=router