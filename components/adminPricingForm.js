import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import isObjEmpty from "lodash/isEmpty";
import { useForm } from "react-hook-form";
import { Input } from "./common/input";
import ImageLoader from "./common/imageLoader";
import { TextArea } from "./common/textArea";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import { LoadingSpinner } from "./loading-spinner";
import popSound from ".././public/sounds/pop_char.mp3";
import popDownSound from ".././public/sounds/pop_down.mp3";
import downWave from ".././public/images/down-wave.svg";
import useSound from "use-sound";

const AdminPricingForm = ({
  selectedData,
  defaultValues,
  dataResolved,
  selectedPackage,
  operation,
  status,
  handleEditPackageSubmit,
  handleAddPackageSubmit,
  handleEditAddOnsSubmit,
}) => {
  const [packageDetailsLength, setPackageDetailsLength] = useState([
    { title: "packageDetail", id: Math.floor(1000 + Math.random() * 9000) },
  ]);
  const [addOnsLength, setAddOnsLength] = useState([
    { title: "addOn", id: Math.floor(1000 + Math.random() * 9000) },
  ]);
  const [packDetailFocus, setPackDetailFocus] = useState(false);
  const [
    packagesFormAnimationComplete,
    setPackagesFormAnimationComplete,
  ] = useState(true);
  const [
    addOnsFormAnimationComplete,
    setAddOnsFormAnimationComplete,
  ] = useState(true);

  const timeout = useRef(null);

  useEffect(() => {
    () => clearTimeout(timeout.current);
  }, []);

  useEffect(() => {
    if (!isObjEmpty(defaultValues) && dataResolved) {
      handleDefaultValues();
    }
  }, [dataResolved, selectedPackage]);

  const { register, handleSubmit, reset, errors, unregister } = useForm();

  const [play] = useSound(popSound);
  const [playDown] = useSound(popDownSound);

  const schema = {
    packageName: {
      required: "A package name is required !",
      minLength: { value: 3, message: "package name is too short !" },
      maxLength: { value: 16, message: "package name is too long !" },
    },
    price: {
      required: "A price is required !",
      pattern: {
        value: /^\d*\d$/,
        message: "numbers only !",
      },
    },
    description: {
      required: "A description is required !",
      minLength: { value: 3, message: "description is too short !" },
      maxLength: { value: 130, message: "description is too long !" },
    },
    packageDetail: {
      required: "A name is required !",
      minLength: {
        value: 1,
        message: "Package Detail should be greater than 1 character !",
      },
    },
  };

  const handleDefaultValues = () => {
    if (operation === "Edit") {
      if (selectedData === "packages") {
        handlePackageDetails();
      } else {
        handleAddOns();
      }
    }
  };

  const handlePackageDetails = () => {
    const packageDetailsLengthClone = [...packageDetailsLength];

    if (
      defaultValues.packageDetails.length > packageDetailsLengthClone.length
    ) {
      while (
        defaultValues.packageDetails.length > packageDetailsLengthClone.length
      ) {
        packageDetailsLengthClone.push({
          title: "packageDetail",
          id: Math.floor(1000 + Math.random() * 9000),
        });
      }
    }

    if (
      defaultValues.packageDetails.length < packageDetailsLengthClone.length
    ) {
      const amount =
        packageDetailsLengthClone.length - defaultValues.packageDetails.length;
      const index = defaultValues.packageDetails.length - 1;
      packageDetailsLengthClone.splice(index, amount);
    }
    setPackageDetailsLength(packageDetailsLengthClone);

    let defaultValuesWithPackageDetails = {};

    for (let packageDetail of packageDetailsLengthClone) {
      let index = packageDetailsLengthClone.indexOf(packageDetail);
      defaultValuesWithPackageDetails[`packageDetail_${packageDetail.id}`] =
        defaultValues.packageDetails[index];
    }

    defaultValuesWithPackageDetails.packageName = defaultValues.packageName;
    defaultValuesWithPackageDetails.price = defaultValues.price;
    defaultValuesWithPackageDetails.description = defaultValues.description;

    reset(defaultValuesWithPackageDetails);
  };

  const handleAddOns = () => {
    const addOnsLengthClone = [...addOnsLength];

    if (defaultValues.length > 1) {
      while (defaultValues.length > addOnsLengthClone.length) {
        addOnsLengthClone.push({
          title: "addOn",
          id: Math.floor(1000 + Math.random() * 9000),
        });
        setAddOnsLength(addOnsLengthClone);
      }

      let addOns = {};

      for (let i of addOnsLengthClone) {
        let index = addOnsLengthClone.indexOf(i);
        addOns["addOnTitle_" + i.id] = defaultValues[index].title;

        addOns["addOnPrice_" + i.id] = defaultValues[index].price;
      }
      reset(addOns);
    }
  };

  const handlePackagesSubmit = async (data) => {
    if (operation === "Edit") {
      handleEditPackageSubmit(data);
    } else {
      const response = await handleAddPackageSubmit(data);
      if (response) {
        unregisterPackageDetails(data);
        reset();
        setPackageDetailsLength([
          {
            title: "packageDetail",
            id: Math.floor(1000 + Math.random() * 9000),
          },
        ]);
      }
    }
  };

  const unregisterPackageDetails = (data) => {
    const array = Object.entries(data);

    let unregisterArray = [];
    array.map((value) => {
      if (value[0].includes("packageDetail_")) {
        unregisterArray.push(value[0]);
      }
    });
    unregister(unregisterArray);
  };

  const handleAddOnsSubmit = (data) => {
    if (operation === "Edit") {
      handleEditAddOnsSubmit(data);
    }
  };

  const deletePackageDetail = (index) => {
    const packageDetailsLengthClone = [...packageDetailsLength];
    if (index > -1 && packageDetailsLength.length > 1) {
      playDown();
      unregister(`packageDetail_${packageDetailsLengthClone[index].id}`);
      packageDetailsLengthClone.splice(index, 1);
      setPackageDetailsLength(packageDetailsLengthClone);
    }
  };

  const addPackageDetail = (index) => {
    const packageDetailsLengthClone = [...packageDetailsLength];
    if (index > -1 && packageDetailsLengthClone.length <= 10) {
      play();
      setPackDetailFocus(true);
      packageDetailsLengthClone.splice(index + 1, 0, {
        title: "packageDetail",
        id: Math.floor(1000 + Math.random() * 9000),
      });

      setPackageDetailsLength(packageDetailsLengthClone);
    }
  };

  const deleteAddOn = (index) => {
    const addOnsLengthClone = [...addOnsLength];
    if (index > -1 && addOnsLength.length > 1) {
      playDown();
      unregister(`addOnTitle${addOnsLengthClone[index].id}`);
      unregister(`addOnPrice${addOnsLengthClone[index].id}`);
      addOnsLengthClone.splice(index, 1);
      setAddOnsLength(addOnsLengthClone);
    }
  };

  const addAddOn = (index) => {
    const addOnsLengthClone = [...addOnsLength];
    if (index > -1 && addOnsLengthClone.length <= 10) {
      play();
      addOnsLengthClone.splice(index + 1, 0, {
        title: "packageDetail",
        id: Math.floor(1000 + Math.random() * 9000),
      });
      setAddOnsLength(addOnsLengthClone);
    }
  };

  const handlePackagesFormAnimationComplete = () => {
    setPackagesFormAnimationComplete(true);
    timeout.current = setTimeout(() => {
      setAddOnsFormAnimationComplete(false);
    }, 300);
  };

  const handleAddOnsFormAnimationComplete = () => {
    setAddOnsFormAnimationComplete(true);
    timeout.current = setTimeout(() => {
      setPackagesFormAnimationComplete(false);
    }, 300);
  };

  const variants = {
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.01,
      staggerDirection: -1,
    },
    show: {
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const formAnimation = {
    hidden: {
      opacity: 0,
      y: 20,
      x: 0,
      transition: {
        staggerDirection: -1,
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        staggerDirection: 1,
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const buttonAnimation = {
    hidden: {
      opacity: 0,
      y: 12,
    },
    show: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <AnimateSharedLayout>
      <FormContainer layout variants={variants}>
        <Wave src={downWave} layout />
        <AnimatePresence onExitComplete={handlePackagesFormAnimationComplete}>
          {selectedData === "packages" && addOnsFormAnimationComplete && (
            <Form
              onSubmit={handleSubmit(handlePackagesSubmit)}
              variants={formAnimation}
              initial="hidden"
              animate="show"
              exit="hidden"
              layout
            >
              <Title>
                {operation === "Add"
                  ? `${operation} Pricing Package`
                  : `${operation} Pricing Packages`}
              </Title>
              <Input
                name="packageName"
                label="Title"
                ref={register(schema.packageName)}
                error={errors.packageName}
              />
              <Input
                name="price"
                label="Price"
                ref={register(schema.price)}
                error={errors.price}
              />
              <TextArea
                name="description"
                label="Description"
                ref={register(schema.description)}
                error={errors.description}
              />

              {packageDetailsLength.map((packageDetail) => (
                <PackageDetailsContainer key={packageDetail.id}>
                  <AddPackageDetail
                    variants={buttonAnimation}
                    tabIndex="0"
                    role="button"
                    aria-label="add package detail button"
                    title="add package detail"
                    onClick={() =>
                      addPackageDetail(
                        packageDetailsLength.indexOf(packageDetail)
                      )
                    }
                    onKeyDown={(e) => {
                      const key = e.key === 13 || e.keyCode === 13;
                      key &&
                        addPackageDetail(
                          packageDetailsLength.indexOf(packageDetail)
                        );
                    }}
                  >
                    <ImageLoader
                      maxWidth="inherit"
                      placeholderSize="100%"
                      opacity={0}
                      alt="plus icon"
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
                    autoFocus={packDetailFocus ? true : false}
                    opacity={0}
                  />
                  <DeletePackageDetail
                    variants={buttonAnimation}
                    tabIndex="0"
                    role="button"
                    aria-label="delete package detail button"
                    title="delete package detail"
                    onClick={() =>
                      deletePackageDetail(
                        packageDetailsLength.indexOf(packageDetail)
                      )
                    }
                    onKeyDown={(e) => {
                      const key = e.key === 13 || e.keyCode === 13;
                      key &&
                        deletePackageDetail(
                          packageDetailsLength.indexOf(packageDetail)
                        );
                    }}
                  >
                    <ImageLoader
                      maxWidth="inherit"
                      placeholderSize="100%"
                      alt="minus icon"
                      opacity={0}
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
                disabled={status === "pending" ? true : false}
              >
                {status === "pending" ? (
                  <LoadingSpinner size={"28px"} />
                ) : status === "resolved" ? (
                  "Success"
                ) : operation === "Edit" ? (
                  "Update"
                ) : (
                  "Add"
                )}
              </SubmitButton>
            </Form>
          )}
        </AnimatePresence>
        <AnimatePresence onExitComplete={handleAddOnsFormAnimationComplete}>
          {selectedData === "addOns" && packagesFormAnimationComplete && (
            <Form
              onSubmit={handleSubmit(handleAddOnsSubmit)}
              variants={formAnimation}
              initial="hidden"
              animate="show"
              exit="hidden"
              layout
            >
              <Title>Edit Add Ons</Title>
              {addOnsLength.map((addOn) => (
                <PackageDetailsContainer key={addOn.id}>
                  <AddPackageDetail
                    tabIndex="0"
                    role="button"
                    onClick={() => addAddOn(addOnsLength.indexOf(addOn))}
                  >
                    <ImageLoader
                      maxWidth="inherit"
                      placeholderSize="100%"
                      opacity={0}
                      alt="plus icon"
                      hover={true}
                      src={
                        "https://chpistel.sirv.com/Connor-Portfolio/plus.png?w=23"
                      }
                    />
                  </AddPackageDetail>
                  <Input
                    name={`addOnTitle_${addOn.id}`}
                    label="Title"
                    ref={register(schema.addOn)}
                    error={errors[`addOnTitle_${addOn.id}`]}
                    marginRight="6px"
                  />
                  <Input
                    name={`addOnPrice_${addOn.id}`}
                    label="Price"
                    ref={register(schema.addOn)}
                    error={errors[`addOnPrice_${addOn.id}`]}
                    marginLeft="6px"
                  />
                  <DeletePackageDetail
                    tabIndex="0"
                    role="button"
                    onClick={() => deleteAddOn(addOnsLength.indexOf(addOn))}
                  >
                    <ImageLoader
                      maxWidth="inherit"
                      placeholderSize="100%"
                      opacity={0}
                      alt="minus icon"
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
                variants={buttonAnimation}
                disabled={status === "pending" ? true : false}
              >
                {status === "pending" ? (
                  <LoadingSpinner size={"28px"} />
                ) : status === "resolved" ? (
                  "Success"
                ) : (
                  "Update"
                )}
              </SubmitButton>
            </Form>
          )}
        </AnimatePresence>
      </FormContainer>
    </AnimateSharedLayout>
  );
};

export default AdminPricingForm;

AdminPricingForm.propTypes = {
  selectedData: PropTypes.string,
  defaultValues: PropTypes.object,
  dataResolved: PropTypes.bool,
  selectedPackage: PropTypes.object,
  operation: PropTypes.string,
  status: PropTypes.string,
  status: PropTypes.string,
  handleEditPackageSubmit: PropTypes.func,
  handleAddPackageSubmit: PropTypes.func,
  handleEditAddOnsSubmit: PropTypes.func,
};

const FormContainer = styled(motion.div)`
  width: 100%;
  padding-top: 18%;
  box-sizing: border-box;
  position: relative;
  background-color: white;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 150px;
  display: flex;
  align-items: center;
  flex-direction: column;
  @media (max-width: 950px) {
    padding-top: 25%;
  }
`;

const Title = styled(motion.h1)`
  margin: 70px 0px;
  text-align: center;
  @media (max-width: 750px) {
    margin: 10% 0px;
    font-size: 1.4rem;
  }
`;

const Wave = styled(motion.img)`
  position: absolute;
  top: -2px;
  left: 0px;
  width: 100%;
  object-fit: cover;
  @media (max-width: 950px) {
    top: -10px;
  }
`;

const PackageDetailsContainer = styled(motion.div)`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
  @media (max-width: 772px) {
    height: 130px;
  }
`;

const AddPackageDetail = styled(motion.div)`
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
  @media (max-width: 772px) {
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

const DeletePackageDetail = styled(motion.div)`
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
  @media (max-width: 772px) {
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
