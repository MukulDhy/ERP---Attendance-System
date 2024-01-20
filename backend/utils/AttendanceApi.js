class AttendanceApi {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
  search() {
    const keyword = this.queryStr.keyword
      ? {
          $or: [
            { date: new Date(this.convert(this.queryStr.keyword)) },
          ],
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }
  // filterBranch(){
  //   const copyQueryStr = {...this.queryStr};
  //   const removeFeilds = ["keyword"];
  // }
  filter(){
    const copyQueryStr = {...this.queryStr};
    const removeFeilds = ["keyword"];

    removeFeilds.forEach( (key) => delete copyQueryStr[key]);

    // console.log(copyQueryStr);

    /* Filtering for price and rating */
    // console.log(copyQueryStr);
    // copyQueryStr = JSON.stringify(copyQueryStr);
    // console.log(copyQueryStr);
    // copyQueryStr = copyQueryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
    // console.log(copyQueryStr);
    // copyQueryStr = JSON.parse(copyQueryStr);
    // console.log(copyQueryStr);

    this.query = this.query.find(copyQueryStr);

    return this;
  }
  
}

module.exports = AttendanceApi;
