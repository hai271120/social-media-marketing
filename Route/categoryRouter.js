const router = require('express').Router()
const categoryCtrl = require('../Controller/categoryController')
const auth = require('../middleware/authmiddleware')
router.route('/category')
    .get(categoryCtrl.getCategories)
     .post(auth, categoryCtrl.createCategory)

 router.route('/category/:id')
    .delete(auth,categoryCtrl.deleteCategory)
    .put(auth, categoryCtrl.updateCategory)


module.exports = router