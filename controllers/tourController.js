// const fs = require("fs");
const Tour = require("./../models/tourModel");

// const tours = fs.readFileSync(
//   `${__dirname}/../dev-data/data/tours-simple.json`
// );
// const toursObj = JSON.parse(tours);

// exports.checkId = (req, res, next, val) => {
//   const tour = toursObj.find((el) => el.id === +val);
//
//   if (!tour) {
//     return res.status(404).json({
//       status: "not found",
//       message: `Could not find a tour for the id: ${val}`,
//     });
//   }
//   next();
// };

// exports.checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price) {
//     return res.status(400).json({
//       status: "fail",
//       message: "Missing name or price",
//     });
//   }
//   next();
// };
exports.getAllTours = async (req, res) => {
  // console.log(req.requestTime);

  try {
    const queryObj = { ...req.query };
    // const excludedFields = ['page','sort','limit','fields'];
    const {
      page = "1",
      sort = "",
      limit = "0",
      fields = "",
      ...finalQueryObj
    } = queryObj;
    // console.log(req.query);
    console.log(finalQueryObj);

    const query = Tour.find(finalQueryObj);

    const tours = await query;
    res.status(200).json({
      status: "success",
      results: tours.length,
      data: {
        tours: tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getTour = async (req, res) => {
  // console.log(req.params)

  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: "success",
      results: 1,
      data: {
        tour: tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      results: 1,
      data: {
        tour: updatedTour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.addTour = async (req, res) => {
  // console.log(req.body);

  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: "Success",
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Invalid data sent!",
    });
  }
};
