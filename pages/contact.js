import { getAllPricingPackages } from "./api/pricing";
import React, { useState, useEffect } from "react";
import ContactForm from "../components/common/contactForm";
import ErrorMessage from "../components/common/errorMessage";

const Contact = ({ data }) => {
  return data ? <ContactForm data={data} /> : <ErrorMessage />;
};

export async function getStaticProps() {
  const data = await getAllPricingPackages();
  return {
    props: data ? { data } : { data: null },
  };
}

export default Contact;
