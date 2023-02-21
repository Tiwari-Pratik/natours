const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());

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

app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({
    status: "success",
    results: toursObj.length,
    data: {
      tours: toursObj,
    },
  });
});

app.post("/api/v1/tours", (req, res) => {
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
});

const port = 8000;
app.listen(port, () => {
  console.log(`App running on port: ${port}`);
});
