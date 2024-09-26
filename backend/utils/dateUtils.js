// Date helper functions
const moment = require("moment");

const dateFormat = "DD-MM-YYYY";

// Get the current date in consistent string format
const today = () => {
  return moment().format(dateFormat);
};

// Format a date to consistent string format
// @param {Date} or {String} date - The date to format
const formatDate = (date) => {
  return moment(date, dateFormat, true).format(dateFormat);
};

// Formats a date string to consistent date format
// @param {String} date - The date to parse
const parseDate = (date) => {
  return moment(date, dateFormat, true);
};

// Get the difference in days between a date and the current date
// @param {String} date - The date to compare
const daysDiff = (date) => {
  const today = moment();
  const start = moment(date, dateFormat, true);
  const diff = today.diff(start, "days");
  return diff;
};

module.exports = {
  dateFormat,
  today,
  formatDate,
  parseDate,
  daysDiff,
};
