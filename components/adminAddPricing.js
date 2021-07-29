import AdminPricing from "./common/adminPricing";
import PropTypes from "prop-types";

const AdminAddPricing = ({ data }) => {
  return <AdminPricing operation="Add" data={data} />;
};

export default AdminAddPricing;

AdminAddPricing.propTypes = {
  data: PropTypes.any,
};
