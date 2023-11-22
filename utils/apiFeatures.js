class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
    this.page = "1";
    this.sort = "";
    this.limit = "100";
    this.fields = "";
    this.newQueryObj = {};
  }

  filter() {
    const queryObj = { ...this.queryString };
    // const excludedFields = ['page','sort','limit','fields'];
    const {
      page = "1",
      sort = "",
      limit = "100",
      fields = "",
      ...newQueryObj
    } = queryObj;

    this.page = page;
    this.sort = sort;
    this.limit = limit;
    this.fields = fields;
    this.newQueryObj = newQueryObj;

    // console.log(queryObj);
    // console.log(newQueryObj);

    let queryStr = JSON.stringify(newQueryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    const finalQueryObj = JSON.parse(queryStr);
    this.query = this.query.find(finalQueryObj);

    return this;
    // console.log(finalQueryObj);

    // let query = Tour.find(finalQueryObj);
  }

  sorted() {
    if (this.sort) {
      const sortBy = this.sort.split(",").join(" ");
      // console.log(sortBy);
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  limitedFields() {
    if (this.fields) {
      const fieldProjections = this.fields.split(",").join(" ");
      // console.log(fieldProjections);
      this.query = this.query.select(fieldProjections);
    } else {
      this.query = this.query.select("-__v");
    }

    return this;
  }
  pagination() {
    const skip = (parseInt(this.page) - 1) * parseInt(this.limit);
    // console.log(skip);
    this.query = this.query.skip(skip).limit(parseInt(this.limit));

    // if (this.page) {
    //   const numTours = await Tour.countDocuments();
    //   if (skip >= numTours) throw new Error("This page does not exist");
    // }

    return this;
  }
}

module.exports = APIFeatures;
