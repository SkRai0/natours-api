const express = require('express')

const router = express.Router()
const userController = require('./../controllers/userController')

router.route('/')
    .get(userController.getAllUsers)
    .post(userController.checkBody,userController.postUser)
//Get a particular tour - (:id = Creates variable id in url, :id? = Creates a non compulsory variable in url)
router.route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser)

module.exports = router;