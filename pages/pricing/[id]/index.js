import WeddingPricing from "../../../components/weddingPricing";
import CorporatePricing from "../../../components/corporatePricing";
import { getAllPricingPackages, getAddOns } from "../../api/pricing";
import ErrorMessage from "../../../components/common/errorMessage";

const Pricing = ({ params, data }) => {
  return params.id === "weddings" ? (
    data ? (
      <WeddingPricing data={data} />
    ) : (
      <ErrorMessage />
    )
  ) : data ? (
    <CorporatePricing data={data} />
  ) : (
    <ErrorMessage />
  );
};

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "weddings" } }, { params: { id: "corporate" } }],
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  if (params.id === "weddings") {
    const packages = await getAllPricingPackages();
    const { addOns } = await getAddOns();
    const data = [packages, addOns];
    return {
      props: data ? { data, params } : { data: null, params },
    };
  } else {
    const data = await getAllPricingPackages();
    return {
      props: data ? { data, params } : { data: null, params },
    };
  }
}

export default Pricing;
