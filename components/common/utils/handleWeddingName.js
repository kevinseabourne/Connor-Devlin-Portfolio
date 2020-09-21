import { cloneDeep } from "lodash";

export const handleWeddingNames = (state, showAdminContentData) => {
  const stateClone = _.cloneDeep(state);
  const updatedWeddings = stateClone.map((wedding) => {
    let weddingNamesArray = [];
    wedding.partners.map((name) =>
      showAdminContentData
        ? weddingNamesArray.push(`${name.firstName} ${name.lastName}`)
        : weddingNamesArray.push(name.firstName)
    );
    wedding.displayNames = weddingNamesArray.join(" & ");
    return wedding;
  });
  return updatedWeddings;
};
