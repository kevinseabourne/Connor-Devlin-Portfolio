import PropTypes from "prop-types";
// ------------------------ bundleDualInputValuesIntoObj ------------------------ //
// Group individual form data together into multiple objects in an array
//
//
// ------------------------ From This ------------------------ //
//
// const data = {
//   partnerFirstName314: "firstName",
//   partnerFirstName975: "firstName",
//   partnerLastName314: "lastName",
//   partnerLastName975: "lastName",
// };
//
// ------------------------ To This ------------------------ //
//
// const data = {
//   partners: [
//     {
//       firstName: "firstName",
//       lastName: "lastName",
//     },
//     {
//       firstName: "firstName",
//       lastName: "lastName",
//     },
//   ],
// };

export const bundleDualInputValuesIntoObj = (
  data, // form key values data
  currentPropOneKey, // the first property key you want grouped
  currentPropTwoKey, // the second property key you want grouped
  newPropOneKey, // first propery name on each object inside bundled method
  newPropTwoKey, // second propery name on each object inside bundled method
  propAddedToData // name of the method you want added the the form data obj
) => {
  const dataClone = { ...data };
  const array = Object.entries(dataClone);

  let bundledArray = [];

  // compare each properties to each other and if the id and the end of their key match they are group together into an object
  array.sort((comparisonOne, comparisonTwo) => {
    if (
      comparisonOne[0].split("_").pop() === comparisonTwo[0].split("_").pop() &&
      comparisonOne[0] !== comparisonTwo[0]
    ) {
      bundledArray.push({
        [newPropOneKey]: comparisonTwo[1],
        [newPropTwoKey]: comparisonOne[1],
      });
    }
  });

  // removed old properties from data
  const filteredArray = array.filter(
    (inputValue) =>
      !inputValue[0].includes(currentPropOneKey) &&
      !inputValue[0].includes(currentPropTwoKey)
  );

  const updatedData = Object.fromEntries(filteredArray);

  updatedData[propAddedToData] = bundledArray;

  return updatedData;
};

bundleDualInputValuesIntoObj.propTypes = {
  data: PropTypes.objectOf(PropTypes.string).isRequired,
  currentPropOneKey: PropTypes.string.isRequired,
  currentPropTwoKey: PropTypes.string.isRequired,
  newPropOneKey: PropTypes.string.isRequired,
  newPropTwoKey: PropTypes.string.isRequired,
  propAddedToData: PropTypes.string.isRequired,
};
