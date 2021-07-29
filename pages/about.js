import AboutPage from "../components/about";
import { getAboutMe } from "./api/about";

const About = ({ data }) => {
  return <AboutPage data={data} />;
};

export async function getStaticProps() {
  const data = await getAboutMe();
  return {
    props: data ? { data } : { data: null },
  };
}

export default About;
