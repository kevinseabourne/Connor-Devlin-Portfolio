import PropTypes from "prop-types";

// Easy Copy Paste
// import { isObjEmpty, isArrayEmpty } from "./common/utils/isEmpty";
// isObjEmpty()
// isArrayEmpty()

export const isObjEmpty = (obj) => {
  const result =
    typeof obj === "object" &&
    Object.keys(obj).length === 0 &&
    obj.constructor === Object;
  return result;
};

isObjEmpty.propTypes = {
  obj: PropTypes.any.isRequired,
};

export const isArrayEmpty = (array) => {
  if (
    Array.isArray(array) ||
    Object.prototype.toString.call(array) === "[object Array]"
  ) {
    return Boolean(array.length);
  }
  return false;
};

isArrayEmpty.propTypes = {
  array: PropTypes.any.isRequired,
};
