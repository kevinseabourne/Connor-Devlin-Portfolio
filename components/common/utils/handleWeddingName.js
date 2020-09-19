import { cloneDeep } from "lodash";

export const handleWeddingNames = (state) => {
  const stateClone = _.cloneDeep(state);
  const updatedWeddings = stateClone.map((wedding) => {
    let weddingNamesArray = [];
    wedding.partners.map((name) => weddingNamesArray.push(name.firstName));
    wedding.displayNames = weddingNamesArray.join(" & ");
    return wedding;
  });
  return updatedWeddings;
};
