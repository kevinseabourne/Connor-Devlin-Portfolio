import _ from "lodash";

export const bundlePartnersIntoObj = (data) => {
  const dataClone = _.cloneDeep(data);
  const array = _.toPairsIn(dataClone);

  let partnersArray = [];
  array.map((partner) => {
    for (let i of array) {
      if (
        // each key has its id on the end of the string. I return items that have the same id are not the same,
        // to exclude dupliced of the same string
        partner[0].split("_").pop() === i[0].split("_").pop() &&
        partner[0] !== i[0]
      ) {
        partnersArray.push({
          firstName: partner[1],
          lastName: i[1],
        });
      }
    }
  });
  // filter out every second item in partners array
  dataClone.partners = partnersArray.filter(
    (partner) => partnersArray.indexOf(partner) % 2 === 0
  );
  return dataClone;
};
