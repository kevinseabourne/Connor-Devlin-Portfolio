import cloneDeep from "lodash/cloneDeep";
import toPairsIn from "lodash/toPairsIn";
import pick from "lodash/pick";

export const bundleSingleInputValueIntoObj = (data, property) => {
  const dataClone = _.cloneDeep(data);
  let array = toPairsIn(dataClone);

  let packageDetails = [];
  array.forEach((formValueObj) => {
    if (formValueObj[0].includes(property)) {
      packageDetails.push(formValueObj[1]);
    }
  });
  // removed packageDetail properties as they have been put in the packageDetail array
  const cleanUpData = pick(dataClone, ["packageName", "price", "description"]);
  cleanUpData.packageDetails = packageDetails;

  return cleanUpData;
};
