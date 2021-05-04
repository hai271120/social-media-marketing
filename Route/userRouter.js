const router = require('express').Router()
const useCtrl = require("../Controller/UserController")
const auth = require("../middleware/authmiddleware") 

router.post("/register",useCtrl.register)
router.post('/login',useCtrl.login)
router.get('/refresh_token',useCtrl.refreshToken)
router.get("/logout",useCtrl.logout)
router.get("/infor",auth,useCtrl.getUser)
module.exports=router