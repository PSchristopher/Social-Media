const express = require("express")
const router = express.Router()
const AdminControl = require('../controller/Admin')


router.post('/adminlogin',AdminControl.login)

router.get('/user_management', AdminControl.getUserManagement)

router.put('/user_management/block_user',AdminControl.blockUser)

router.put('/user_management/unblock_user',AdminControl.unblockUser)

router.get('/reported',AdminControl.reported)

router.get('/reporteddetails/:id',AdminControl.getReportData)

router.put('/block_Post/:id',AdminControl.blockPost)


router.put('/unblock_Post/:id',AdminControl.unBlockPost)

module.exports = router;