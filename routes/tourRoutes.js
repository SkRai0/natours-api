const express = require('express')

const router = express.Router()
const tourController = require('./../controllers/tourController')

router.route('/')
    .get(tourController.getAllTours)
    .post(tourController.postTour)
//Get a particular tour - (:id = Creates variable id in url, :id? = Creates a non compulsory variable in url)
router.route('/stats').get(tourController.getTourStats)
router.route('/stats/:year').get(tourController.getMonthlyPlan)

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;