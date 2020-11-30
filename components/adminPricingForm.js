import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import cloneDeep from "lodash/cloneDeep";
import { useForm } from "react-hook-form";
import { Input } from "./common/input";
import ImageLoader from "./common/imageLoader";
import { TextArea } from "./common/textArea";
import { motion } from "framer-motion";
import { LoadingSpinner } from "./loading-spinner";

const AdminPricingForm = ({ page }) => {
  const [packagesStatus, setPackagesStatus] = useState("idle");
  const [addOnsStatus, setAddOnsStatus] = useState("idle");
  const timeout = useRef(null);
  const [packageDetailsLength, setPackageDetailsLength] = useState([
    { title: "packageDetail", id: Math.floor(1000 + Math.random() * 9000) },
  ]);

  const { register, handleSubmit, reset, errors, unregister } = useForm();

  const schema = {
    packageDetail: {
      required: "A name is required !",
      minLength: {
        value: 1,
        message: "Package Detail should be greater than 1 character !",
      },
      // pattern: {
      //   value: /^[a-zA-Z '.-]*$/,
      //   message: "Letters only !",
      // },
    },
  };

  const handlePackagesSubmit = () => {};

  const handleAddOnsSubmit = () => {};

  const deletePackageDetail = (index) => {
    // playDown();
    const packageDetailsLengthClone = cloneDeep(packageDetailsLength);
    if (index > -1 && packageDetailsLength.length > 1) {
      unregister(`partnerFirstName_${packageDetailsLengthClone[index].id}`);
      packageDetailsLengthClone.splice(index, 1);
      setPackageDetailsLength(packageDetailsLengthClone);
    }
  };

  const addPackageDetail = (index) => {
    // play();
    const packageDetailsLengthClone = cloneDeep(packageDetailsLength);
    if (index > -1 && packageDetailsLengthClone.length <= 10) {
      packageDetailsLengthClone.splice(index + 1, 0, {
        title: "packageDetail",
        id: Math.floor(1000 + Math.random() * 9000),
      });
      setPackageDetailsLength(packageDetailsLengthClone);
    }
  };

  const deleteAddOn = (index) => {
    // playDown();
    const packageDetailsLengthClone = cloneDeep(packageDetailsLength);
    if (index > -1 && packageDetailsLength.length > 1) {
      unregister(`partnerFirstName_${packageDetailsLengthClone[index].id}`);
      packageDetailsLengthClone.splice(index, 1);
      setPackageDetailsLength(packageDetailsLengthClone);
    }
  };

  const addAddOn = (index) => {
    // play();
    const packageDetailsLengthClone = cloneDeep(packageDetailsLength);
    if (index > -1 && packageDetailsLengthClone.length <= 10) {
      packageDetailsLengthClone.splice(index + 1, 0, {
        title: "packageDetail",
        id: Math.floor(1000 + Math.random() * 9000),
      });
      setPackageDetailsLength(packageDetailsLengthClone);
    }
  };

  return (
    <FormContainer layout>
      {page === "packages" && (
        <Form onSubmit={handleSubmit(handlePackagesSubmit)} layout>
          <Title layout>Edit Pricing Packages</Title>
          <Input
            name="packageName"
            label="Title"
            ref={register}
            error={errors.name}
          />
          <Input
            name="price"
            label="Price"
            ref={register}
            error={errors.price}
          />
          <TextArea
            name="description"
            label="Description"
            ref={register}
            error={errors.description}
          />

          {packageDetailsLength.map((packageDetail) => (
            <PackageDetailsContainer key={packageDetail.id}>
              <AddPackageDetail
                tabIndex="0"
                role="button"
                onClick={() =>
                  addPackageDetail(packageDetailsLength.indexOf(packageDetail))
                }
              >
                <ImageLoader
                  maxWidth="inherit"
                  placeholderSize="100%"
                  opacity="0"
                  transitionTime="300ms ease"
                  hover={true}
                  src={
                    "https://chpistel.sirv.com/Connor-Portfolio/plus.png?w=23"
                  }
                />
              </AddPackageDetail>
              <Input
                name={`packageDetail_${packageDetail.id}`}
                label="Package Detail"
                ref={register(schema.packageDetail)}
                error={errors[`packageDetail_${packageDetail.id}`]}
              />
              <DeletePackageDetail
                tabIndex="0"
                role="button"
                onClick={() =>
                  deletePackageDetail(
                    packageDetailsLength.indexOf(packageDetail)
                  )
                }
              >
                <ImageLoader
                  maxWidth="inherit"
                  placeholderSize="100%"
                  opacity="0"
                  transitionTime="300ms ease"
                  hover={true}
                  src={
                    "https://chpistel.sirv.com/Connor-Portfolio/minus%20(1).png?w=23"
                  }
                />
              </DeletePackageDetail>
            </PackageDetailsContainer>
          ))}
          <SubmitButton
            layout
            type="submit"
            whileTap={{ scale: 0.9 }}
            disabled={packagesStatus === "pending" ? true : false}
          >
            {packagesStatus === "pending" ? (
              <LoadingSpinner size={"28px"} />
            ) : packagesStatus === "resolved" ? (
              "Success"
            ) : (
              "Update"
            )}
          </SubmitButton>
        </Form>
      )}
      {page === "addOns" && (
        <Form onSubmit={handleSubmit(handleAddOnsSubmit)}>
          {addOns.map((addOn) => (
            <PackageDetailsContainer>
              <AddPackageDetail
                tabIndex="0"
                role="button"
                onClick={() => addAddOn(addOns.indexOf(addOn))}
              >
                <ImageLoader
                  maxWidth="inherit"
                  placeholderSize="100%"
                  opacity="0"
                  transitionTime="300ms ease"
                  hover={true}
                  src={
                    "https://chpistel.sirv.com/Connor-Portfolio/plus.png?w=23"
                  }
                />
              </AddPackageDetail>
              <Input
                name={`addOnPrice_${addOn.id}`}
                label="Price"
                ref={register(schema.addOn)}
                error={errors[`addOnPrice_${addOn.id}`]}
              />
              <Input
                name={`addOnTitle_${addOn.id}`}
                label="Title"
                ref={register(schema.addOn)}
                error={errors[`addOnTitle_${addOn.id}`]}
              />
              <DeletePackageDetail
                tabIndex="0"
                role="button"
                onClick={() => deleteAddOn(addOns.indexOf(addOn))}
              >
                <ImageLoader
                  maxWidth="inherit"
                  placeholderSize="100%"
                  opacity="0"
                  transitionTime="300ms ease"
                  hover={true}
                  src={
                    "https://chpistel.sirv.com/Connor-Portfolio/minus%20(1).png?w=23"
                  }
                />
              </DeletePackageDetail>
            </PackageDetailsContainer>
          ))}
          <SubmitButton
            layout
            type="submit"
            whileTap={{ scale: 0.9 }}
            disabled={addOnsStatus === "pending" ? true : false}
          >
            {addOnsStatus === "pending" ? (
              <LoadingSpinner size={"28px"} />
            ) : addOnsStatus === "resolved" ? (
              "Success"
            ) : (
              "Update"
            )}
          </SubmitButton>
        </Form>
      )}
    </FormContainer>
  );
};

export default AdminPricingForm;

const FormContainer = styled(motion.div)``;

const Title = styled(motion.h1)`
  margin: 70px 0px;
  text-align: center;
  @media (max-width: 750px) {
    margin: 10% 0px;
    font-size: 1.4rem;
  }
`;

const PackagesContainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 0px;
  padding: 0 20px;
  box-sizing: border-box;
  @media (max-width: 852px) {
    flex-direction: column;
    flex-wrap: nowrap;
  }
`;

const Package = styled.div`
  display: flex;
  max-width: 360px;
  align-items: center;
  justify-content: center;
  margin: 30px;
  flex-direction: column;
  border: 1px solid #efefef;
  border-radius: 9px;
  &:first-child {
    margin-left: 0px;
  }
  @media (max-width: 852px) {
    margin: 0px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 30px;
    max-width: 500px;
    &:first-child {
      margin: 30px auto;
    }
  }
`;

const InnerPackageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  box-sizing: border-box;
  padding: 0px 20px;
  &:hover {
    cursor: default;
  }
`;

const Name = styled.h3`
  margin-top: 20px;
  font-size: 2rem;
  font-weight: 500;
  color: #e78b1b;
`;

const Price = styled.span`
  font-size: 1.2rem;
  margin-bottom: 0px;
  color: #e78b1b;
`;

const Description = styled.p`
  font-size: 0.9rem;
  text-align: center;
  display: flex;
  margin-top: 7px;
  align-items: center;
  justify-content: center;
  padding-bottom: 20px;
  margin-bottom: 0px;
  width: 100%;
  letter-spacing: 0.2px;
  border-bottom: 1px solid #efefef;
`;

const Item = styled.span`
  font-size: 1rem;
  text-align: center;
  padding: 25px 0px;
  border-bottom: 1px solid #efefef;
  width: 100%;
  letter-spacing: 0.2px;
`;

const Button = styled.button`
  width: 100%;
  padding: 25px 10px;
  color: white;
  font-family: inherit;
  letter-spacing: 1.5px;
  background-color: #ea8f1f;
  font-size: 1.2rem;
  border: none;
  letter-spacing: 0.2px;
  border-bottom-left-radius: 9px;
  border-bottom-right-radius: 9px;
  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
`;

const PackageDetailsContainer = styled(motion.div)`
  width: 100%;
  position: relative;
`;

const AddPackageDetail = styled.div`
  width: 20px;
  display: flex;
  margin-right: 10px;
  position: absolute;
  left: -40px;
  top: 35px;
  padding: 0px;
  border: none;
  background: none;
  height: 20px;
  &:focus:not(:focus-visible) {
    outline: none;
  }
  @media (max-width: 609px) {
    order: 4;
    bottom: 22px;
    top: unset;
    width: 23px;
    left: 90px;
  }
  @media (max-width: 340px) {
    left: 50px;
  }
`;

const DeletePackageDetail = styled.div`
  width: 20px;
  margin-left: 10px;
  position: absolute;
  right: -40px;
  top: 35px;
  padding: 0px;
  border: none;
  background: none;
  height: 20px;
  &:focus:not(:focus-visible) {
    outline: none;
  }
  @media (max-width: 609px) {
    position: absolute;
    bottom: 22px;
    top: unset;
    width: 23px;
    right: 90px;
  }
  @media (max-width: 340px) {
    right: 50px;
  }
`;

const Form = styled(motion.form)`
  width: 100%;
  max-width: 650px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const SubmitButton = styled(motion.button)`
  margin-top: 10px;
  font-size: 1rem;
  min-height: 54px;
  min-width: 200px;
  max-width: 214.23px;
  padding: 18px 80px;
  border-radius: 9px;
  border: none;
  color: white;
  position: relative;
  font-weight: 600;
  box-shadow: rgba(0, 0, 0, 0.02) 0px -5.9px 2.7px,
    rgba(0, 0, 0, 0.024) 0px -1.2px 6.9px, rgba(0, 0, 0, 0.03) 0px 8px 14.2px,
    rgba(0, 0, 0, 0.04) 0px 21.9px 29.2px, rgba(0, 0, 0, 0.07) 0px 49px 80px;
  transition: all 0.2s ease;
  background-image: ${({ theme }) =>
    `radial-gradient( circle farthest-corner at 10% 20%,  ${theme.colors.gradient1} 0%, ${theme.colors.gradient2} 100.2% )`};
  &:hover {
    cursor: pointer;
  }
  &:active {
    transform: scale(0.95);
  }
  &:focus:not(:focus-visible) {
    outline: none;
  }
  @media (max-width: 609px) {
    margin-bottom: 60px;
    max-width: 100%;
    width: 100%;
  }
`;
