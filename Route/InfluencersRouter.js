const router = require('express').Router()
const influencerCtrl= require("../Controller/influencersController")
router.route('/influencer')
    .get(influencerCtrl.getInfluencer)
    .post( influencerCtrl.createInfluencer)

router.route('/influencer/:id')
    .delete( influencerCtrl.deleteInfluencer)
    .put( influencerCtrl.updateInfluencer)

    module.exports = router