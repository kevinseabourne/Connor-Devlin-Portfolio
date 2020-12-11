import toPairsIn from "lodash/toPairsIn";
import cloneDeep from "lodash/cloneDeep";
import pick from "lodash/pick";
import groupBy from "lodash/groupBy";

export const bundleDualInputValuesIntoObj = (
  data,
  propOne, // first propery name on each object inside bundled method
  propTwo, // second propery name on each object inside bundled method
  propAddedToData // name of the method you want added the the form data obj
) => {
  const dataClone = cloneDeep(data);
  const array = toPairsIn(dataClone);

  let bundledArray = [];
  for (let propertyOne of array) {
    for (let propertyTwo of array) {
      if (
        // matching propeties will have the same id on the ends of their string
        propertyOne[0].split("_").pop() === propertyTwo[0].split("_").pop() &&
        propertyOne[0] !== propertyTwo[0]
      ) {
        bundledArray.push({
          [propOne]: propertyOne[1],
          [propTwo]: propertyTwo[1],
        });
      }
    }
  }

  // filter out every second item in partners array
  dataClone[propAddedToData] = bundledArray.filter(
    (i) => bundledArray.indexOf(i) % 2 === 0
  );
  return dataClone;
};
