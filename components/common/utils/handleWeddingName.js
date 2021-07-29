import PropTypes from "prop-types";

export const handleWeddingNames = (data, showAdminContentData) => {
  const dataClone = [...data];
  const updatedWeddings = dataClone.map((wedding) => {
    const { partners } = wedding;
    let weddingNamesArray = [];
    partners.map((name) => {
      showAdminContentData
        ? weddingNamesArray.push(`${name.firstName} ${name.lastName}`)
        : weddingNamesArray.push(name.firstName);
    });
    wedding.displayNames = weddingNamesArray.join(" & ");
    return wedding;
  });
  return updatedWeddings;
};

handleWeddingNames.propTypes = {
  data: PropTypes.array.isRequired,
  showAdminContentData: PropTypes.boolean,
};
