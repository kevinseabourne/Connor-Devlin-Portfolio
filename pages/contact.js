import { getAllPricingPackages } from "./api/pricing";
import React, { useState, useEffect } from "react";
import ContactForm from "../components/common/contactForm";

const Contact = ({ data }) => {
  return <ContactForm data={data} />;
};

export async function getStaticProps() {
  const data = await getAllPricingPackages();
  return {
    props: data ? { data } : { data: null },
  };
}

export default Contact;
