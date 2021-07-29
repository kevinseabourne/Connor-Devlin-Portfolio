import PropTypes from "prop-types";

export const deepClone = (objORarray) => JSON.parse(JSON.stringify(objORarray));

deepClone.propTypes = {
  objORarray: PropTypes.object || PropTypes.array,
};
