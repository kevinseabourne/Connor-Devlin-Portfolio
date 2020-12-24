import Head from "next/head";

const DynamicHead = ({ title, description, urlQuery }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta
        property="og:url"
        content={`https://connor-devlin-portfolio.vercel.app${urlQuery}`}
      />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
    </Head>
  );
};

export default DynamicHead;
