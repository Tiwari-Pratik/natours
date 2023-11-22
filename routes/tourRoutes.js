const express = require("express");
const {
  aliasTopTours,
  getAllTours,
  getTour,
  addTour,
  updateTour,
  deleteTour,
  checkId,
  checkBody,
  getTourStats,
} = require("../controllers/tourController");

const router = express.Router();

// router.param("id", (req, res, next, val) => {
//   console.log(`The tour id is: ${val}`);
//   next();
// });

// router.param("id", checkId);

router.route("/tour-stats").get(getTourStats);
router.route("/top-5-cheap").get(aliasTopTours, getAllTours);
router.route("/").get(getAllTours).post(addTour);
router.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
