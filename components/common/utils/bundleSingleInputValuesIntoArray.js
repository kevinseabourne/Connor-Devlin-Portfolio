import PropTypes from "prop-types";
// ------------------------ bundleSingleInputValuesIntoArray ------------------------ //
// Group individual form data together into a single array
//
//
// ------------------------ From This ------------------------ //
//
// const data = {
//   packageDetail_314: "string",
//   packageDetail_975: "string",
//   packageDetail_314: "string",
//   packageDetail_975: "string",
// };
//
// ------------------------ To This ------------------------ //
//
// const data = {
//   packageDetails: ["string", "string", "string", "string"],
// };

export const bundleSingleInputValuesIntoArray = (
  data,
  property,
  arrayPropName
) => {
  const dataClone = { ...data };
  const array = Object.entries(dataClone);

  let bundledArray = [];
  array.forEach((inputValue) => {
    if (inputValue[0].includes(property)) {
      bundledArray.push(inputValue[1]);
    }
  });

  // removed old properties from data
  const filteredArray = array.filter(
    (inputValue) => !inputValue[0].includes(property)
  );

  const updatedData = Object.fromEntries(filteredArray);

  updatedData[arrayPropName] = bundledArray;

  return updatedData;
};

bundleSingleInputValuesIntoArray.propTypes = {
  data: PropTypes.objectOf(PropTypes.string).isRequired,
  property: PropTypes.string.isRequired,
  arrayPropName: PropTypes.string.isRequired,
};
