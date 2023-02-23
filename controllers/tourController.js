const fs = require("fs");

const tours = fs.readFileSync(
  `${__dirname}/../dev-data/data/tours-simple.json`
);
const toursObj = JSON.parse(tours);

exports.checkId = (req, res, next, val) => {
  const tour = toursObj.find((el) => el.id === +val);

  if (!tour) {
    return res.status(404).json({
      status: "not found",
      message: `Could not find a tour for the id: ${val}`,
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: "fail",
      message: "Missing name or price",
    });
  }
  next();
};
exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    results: toursObj.length,
    data: {
      tours: toursObj,
    },
  });
};

exports.getTour = (req, res) => {
  // console.log(req.params)
  const tour = toursObj.find((el) => el.id === +req.params.id);
  res.status(200).json({
    status: "success",
    results: 1,
    data: {
      tour: tour,
    },
  });
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: "success",
    results: 1,
    data: {
      tour: "Updated tour here",
    },
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: "success",
    data: null,
  });
};

exports.addTour = (req, res) => {
  // console.log(req.body);
  const newId = toursObj.at(-1).id + 1;
  const newTour = { id: newId, ...req.body };
  toursObj.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(toursObj),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          tour: newTour,
        },
      });
    }
  );
  // res.send("Done");
};
