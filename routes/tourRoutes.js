const express = require("express");
const {
  getAllTours,
  getTour,
  addTour,
  updateTour,
  deleteTour,
} = require("../controllers/tourController");

const router = express.Router();

router.param("id", (req, res, next, val) => {
  console.log(`The tour id is: ${val}`);
  next();
});

router.route("/").get(getAllTours).post(addTour);
router.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
