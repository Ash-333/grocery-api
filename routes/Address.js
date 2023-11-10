const express=require('express')
const router=express.Router()
const {auth}=require('../middleware/auth')
const {getAllAddressOfaUser,getSpecificAddress,addNewAddress,updateAddress,deleteAddress}=require('../controller/Address')

router.get('/:userId/addresses',auth,getAllAddressOfaUser)
router.get('/addresses/:addressId',auth,getSpecificAddress)
router.post('/addresses',auth,addNewAddress)
router.put('/addresses/:addressId',auth,updateAddress)
router.delete('/addresses/:addressId',auth,deleteAddress)

module.exports=router