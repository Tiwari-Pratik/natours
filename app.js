const express = require("express");
const fs = require("fs");
const morgan = require("morgan");

const app = express();

// Middlewares

app.use(morgan("dev"));
app.use(express.json());

app.use((req, res, next) => {
  console.log("Hello from the middleware");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// app.get("/", (req, res) => {
//   res
//     .status(200)
//     .json({ message: "Hello from the server side", app: "Natours" });
// });
//
// app.post("/", (req, res) => {
//   res.send("You can post to this endpoint...");
// });

const tours = fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`);
const toursObj = JSON.parse(tours);

// Route handlers

const getAllTours = (req, res) => {
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

const getTour = (req, res) => {
  // console.log(req.params)
  const { id } = req.params;
  const tour = toursObj.find((el) => el.id === +id);

  if (!tour) {
    res.status(404).json({
      status: "not found",
      message: `Could not find a tour for the id: ${id}`,
    });
  } else {
    res.status(200).json({
      status: "success",
      results: 1,
      data: {
        tour: tour,
      },
    });
  }
};

const updateTour = (req, res) => {
  const { id } = req.params;
  const tour = toursObj.find((el) => el.id === +id);

  if (!tour) {
    res.status(404).json({
      status: "not found",
      message: `Could not find a tour for the id: ${id}`,
    });
  } else {
    res.status(200).json({
      status: "success",
      results: 1,
      data: {
        tour: "Updated tour here",
      },
    });
  }
};

const deleteTour = (req, res) => {
  const { id } = req.params;
  const tour = toursObj.find((el) => el.id === +id);

  if (!tour) {
    res.status(404).json({
      status: "not found",
      message: `Could not find a tour for the id: ${id}`,
    });
  } else {
    res.status(204).json({
      status: "success",
      data: null,
    });
  }
};

const addTour = (req, res) => {
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

// Routes

// app.get("/api/v1/tours", getAllTours);

// app.get("/api/v1/tours/:id", getTour);

// app.patch("/api/v1/tours/:id", updateTour);

// app.delete("/api/v1/tours/:id", deleteTour);

// app.post("/api/v1/tours", addTour);

app.route("/api/v1/tours").get(getAllTours).post(addTour);
app
  .route("/api/v1/tours/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

// Start Server

const port = 8000;
app.listen(port, () => {
  console.log(`App running on port: ${port}`);
});
