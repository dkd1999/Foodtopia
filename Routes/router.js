const express = require('express')

const restController = require('../controller/restController')
const cartController = require('../controller/cartController')
const userController = require('../controller/userController')

const router = new express.Router()

router.post('/app/register',userController.register)
router.post('/app/login',userController.login)
router.post('/app/user',userController.getuserDetails)
router.get('/getallrests',restController.getallerests)
router.get('/getallfood/:id',restController.getallfood)
router.post('/cart/add',cartController.addtoCart)
router.get('/cart/get',cartController.getCart)
// router.get('/usercart/get',userController.getuserCart)
// router for incerementing
router.get('/cart/increment-item/:fid',cartController.incCartItem) 
// router for decrementing
router.get('/cart/decrement-item/:fid',cartController.decCartItem)
// router for remove item from cart
router.delete('/cart/remove-item/:fid',cartController.removecartItem)
// router for empty cart
router.delete('/cart/empty',cartController.emptyCart)
// router for store loc
// router.post('/user/storeloc',userController.storeloc)

// router for storing user cart
// router.post('/cart/store',userController.userkart)
module.exports = router 