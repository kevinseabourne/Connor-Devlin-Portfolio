import React, { useState, useEffect } from "react";
import styled from "styled-components";
import lodash from "lodash";
import { useForm } from "react-hook-form";
import { Input } from "./input";
import { InputWithIcon } from "./inputWithIcon";
import { TextArea } from "./textArea";
import { DayPicker } from "./dayPicker";
import { ReactSelect } from "./select";
import DeleteContent from "../deleteContent";
import ImageLoader from "./imageLoader";
import popSound from "../../public/sounds/pop_char.mp3";
import popDownSound from "../../public/sounds/pop_down.mp3";
import successSound from "../../public/sounds/music_marimba_on_hi.mp3";
import errorSound from "../../public/sounds/pad_soft_off.mp3";
import useSound from "use-sound";

const AdminContentForm = ({
  page,
  handleWeddingSubmit,
  handleCorporateSubmit,
  defaultValues,
  operation,
  selectedVideo,
  handleDeleteWeddingSubmit,
  handleDeleteCorporateSubmit,
}) => {
  const [partnersInputLength, setPartnersInputLength] = useState([
    { title: "partner", id: Math.floor(1000 + Math.random() * 9000) },
    { title: "partner", id: Math.floor(1000 + Math.random() * 9000) },
  ]);
  const [status, setStatus] = useState("idle");
  const {
    register,
    handleSubmit,
    reset,
    control,
    errors,
    unregister,
    clearErrors,
    formState,
  } = useForm();
  const { isSubmitting, isSubmitSuccessful } = formState;
  const [play] = useSound(popSound);
  const [playDown] = useSound(popDownSound);
  const [playSuccessSound] = useSound(successSound, { volume: 0.2 });
  const [playErrorSound] = useSound(errorSound, { volume: 0.2 });

  useEffect(() => {
    if (!_.isEmpty(defaultValues)) {
      handleDefaultValues();
    }
  }, [selectedVideo]);

  useEffect(() => {
    if (status === "resolved") {
      const timer = setTimeout(() => setStatus("idle"), 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  useEffect(() => {
    // check that the error sound is not played on a successful post
    if (!isSubmitSuccessful && !_.isEmpty(errors)) {
      playErrorSound();
    }
  }, [errors]);

  const schema = {
    videoId: {
      required: "A video ID is required !",
      pattern: {
        value: /^\d*\d$/g,
        message: "Numbers Only !",
      },
    },
    name: {
      required: "A name is required !",
      minLength: {
        value: 1,
        message: "Name should be greater than 1 character !",
      },
      pattern: {
        value: /^[a-zA-Z '.-]*$/,
        message: "Letters only !",
      },
    },
    date: {
      required: "A date is required ! (DD/MM/YYYY)",
    },
    suburb: {
      required: "A Suburb is required !",
      minLength: {
        value: 1,
        message: "Suburb should be greater than 1 character !",
      },
      pattern: {
        value: /^[a-zA-Z '.-]*$/,
        message: "Letters only !",
      },
    },
    stateTerritory: {
      required: "select a State/Territory !",
    },
    company: {
      required: "a company name is required !",
    },
  };

  const handleDefaultValues = () => {
    if (operation === "Edit") {
      if (page === "weddings") {
        handleDefaultNames();
      } else {
        reset({
          corporateVideoId: defaultValues.corporateVideoId,
          company: defaultValues.company,
          jobDate: defaultValues.jobDate,
          corporateTestimonial: defaultValues.corporateTestimonial,
        });
      }
    }
  };

  const handleDefaultNames = () => {
    const partnersInputLengthClone = _.cloneDeep(partnersInputLength);

    if (defaultValues.partners.length > 2) {
      while (defaultValues.partners.length > partnersInputLengthClone.length) {
        partnersInputLengthClone.push({
          title: "partner",
          id: Math.floor(1000 + Math.random() * 9000),
        });
        setPartnersInputLength(partnersInputLengthClone);
      }
      let defaultValuesWithPartners = {};

      for (let i of partnersInputLengthClone) {
        // because partnersInputLength is the same length as defaultValues.partners instead of looping through both
        // all i did was get the index of the first item being looped and use that for other array.
        let index = partnersInputLengthClone.indexOf(i);
        defaultValuesWithPartners["partnerFirstName_" + i.id] =
          defaultValues.partners[index].firstName;

        defaultValuesWithPartners["partnerLastName_" + i.id] =
          defaultValues.partners[index].lastName;
      }

      defaultValuesWithPartners.weddingVideoId = defaultValues.weddingVideoId;
      defaultValuesWithPartners.suburb = defaultValues.suburb;
      defaultValuesWithPartners.weddingDate = defaultValues.weddingDate;
      (defaultValuesWithPartners.stateTerritory = {
        value: defaultValues.stateTerritory,
        label: defaultValues.stateTerritory,
      }),
        (defaultValuesWithPartners.testimonial = defaultValues.testimonial);

      reset(defaultValuesWithPartners);
    } else if (
      partnersInputLengthClone.length > defaultValues.partners.length
    ) {
      const amount =
        partnersInputLengthClone.length - defaultValues.partners.length;
      partnersInputLengthClone.splice(defaultValues.partners.length, amount);
      setPartnersInputLength(partnersInputLengthClone);

      weddingDefaultValues();
    } else {
      weddingDefaultValues();
    }
  };

  const weddingDefaultValues = () => {
    reset({
      ["partnerFirstName_" + partnersInputLength[0].id]: defaultValues
        .partners[0].firstName,
      ["partnerLastName_" + partnersInputLength[0].id]: defaultValues
        .partners[0].lastName,
      ["partnerFirstName_" + partnersInputLength[1].id]: defaultValues
        .partners[1].firstName,
      ["partnerLastName_" + partnersInputLength[1].id]: defaultValues
        .partners[1].lastName,
      weddingVideoId: defaultValues.weddingVideoId,
      suburb: defaultValues.suburb,
      weddingDate: defaultValues.weddingDate,
      stateTerritory: {
        value: defaultValues.stateTerritory,
        label: defaultValues.stateTerritory,
      },
      testimonial: defaultValues.testimonial,
    });
  };

  const deletePartner = (index) => {
    playDown();
    const partnersInputLengthClone = _.cloneDeep(partnersInputLength);
    if (index > -1 && partnersInputLength.length > 2) {
      if (page === "weddings") {
        unregister(`partnerFirstName_${partnersInputLengthClone[index].id}`);
        unregister(`partnerLastName_${partnersInputLengthClone[index].id}`);
      }
      partnersInputLengthClone.splice(index, 1);
      setPartnersInputLength(partnersInputLengthClone);
    }
  };

  const addPartner = (index) => {
    play();
    const partnersInputLengthClone = _.cloneDeep(partnersInputLength);
    if (index > -1 && partnersInputLengthClone.length <= 10) {
      partnersInputLengthClone.splice(index + 1, 0, {
        title: "partner",
        id: Math.floor(1000 + Math.random() * 9000),
      });
      setPartnersInputLength(partnersInputLengthClone);
    }
  };

  const handleWedding = (data) => {
    setStatus("pending");
    const response = handleWeddingSubmit(data);

    if (response) {
      playSuccessSound();
      if (operation === "Add") {
        resetValues(data);
      }
      setStatus("resolved");
    }
  };

  const handleCorporate = (data) => {
    setStatus("pending");
    const response = handleCorporateSubmit(data);

    if (response) {
      playSuccessSound();
      if (operation === "Add") {
        resetValues(data);
      }
      setStatus("resolved");
    }
  };

  const resetValues = (data) => {
    const resetValues = _.mapValues(data, (i) => {
      i = "";
      return i;
    });
    reset(resetValues);
  };

  const stateTerritoryOptions = [
    {
      label: "States/Territories",
      options: [
        { value: "ACT", label: "ACT" },
        { value: "NSW", label: "NSW" },
        { value: "NT", label: "NT" },
        { value: "QLD", label: "QLD" },
        { value: "SA", label: "SA" },
        { value: "TAS", label: "TAS" },
        { value: "VIC", label: "VIC" },
        { value: "WA", label: "WA" },
      ],
    },
  ];

  return (
    <Container>
      {page === "weddings" && (
        <AddWeddingForm onSubmit={handleSubmit(handleWedding)}>
          <Title>{operation} Wedding Content</Title>
          <InfoBox>
            <InfoLabelContainer>
              <ImageLoader
                lazyLoad={true}
                maxWidth="22px"
                placeholderSize="100%"
                src="https://chpistel.sirv.com/Connor-Portfolio/waringSign.png?w=22"
              />
              <InfoLabel>
                To Change the description or display image go to the video on
                your Vimeo account.
              </InfoLabel>
            </InfoLabelContainer>
          </InfoBox>
          <InputWithIcon
            name="weddingVideoId"
            label="video ID"
            ref={register(schema.videoId)}
            error={errors.weddingVideoId}
            icon={
              "https://chpistel.sirv.com/Connor-Portfolio/3121119-512.png?w=16"
            }
            iconMaxWidth="16px"
            iconPlaceHolderSize="100%"
            toolTipImage={
              "https://chpistel.sirv.com/Connor-Portfolio/tooltipImage.png?w=450"
            }
            toolTipImagePlaceHolderSize="58%"
            toolTipImageBorderRadius="9px"
            toolTipMaxWidth="450px"
            toolTipMessage="Paste the video ID from the url above your choosen video on Vimeo here"
          />
          {partnersInputLength.map((partner) => (
            <NameContainer key={partner.id}>
              <AddPartnerButton
                tabIndex="0"
                role="button"
                onKeyDown={(e) => {
                  const key = e.key === 13 || e.keyCode === 13;
                  key && addPartner(partnersInputLength.indexOf(partner));
                }}
                onClick={() => addPartner(partnersInputLength.indexOf(partner))}
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
              </AddPartnerButton>
              <NameInnerContainer>
                <Input
                  name={`partnerFirstName_${partner.id}`}
                  label="First Name"
                  ref={register(schema.name)}
                  error={errors[`partnerFirstName_${partner.id}`]}
                  marginRight="5px"
                />
                <Input
                  name={`partnerLastName_${partner.id}`}
                  label="Last Name"
                  ref={register(schema.name)}
                  error={errors[`partnerLastName_${partner.id}`]}
                  marginLeft="5px"
                />
              </NameInnerContainer>
              <DeletePartnerButton
                tabIndex="0"
                role="button"
                onKeyDown={(e) => {
                  const key = e.key === 13 || e.keyCode === 13;
                  key && deletePartner(partnersInputLength.indexOf(partner));
                }}
                onClick={() =>
                  deletePartner(partnersInputLength.indexOf(partner))
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
              </DeletePartnerButton>
            </NameContainer>
          ))}
          <LocationContainer>
            <Input
              name="suburb"
              label="Suburb"
              ref={register(schema.suburb)}
              error={errors.suburb}
              marginRight="5px"
            />
            <ReactSelect
              control={control}
              ref={register}
              label="State/Territory"
              name="stateTerritory"
              options={stateTerritoryOptions}
              validation={schema.stateTerritory}
              error={errors.stateTerritory}
              marginLeft="5px"
            />
          </LocationContainer>
          <DayPicker
            control={control}
            ref={register}
            label="Date"
            name="weddingDate"
            validation={schema.date}
            error={errors.weddingDate}
          />
          <TextArea
            name="testimonial"
            label="Testimonial"
            ref={register(schema.testimonial)}
            error={errors.testimonial}
          />
          <SubmitButton
            type="submit"
            disabled={status === "pending" ? true : false}
          >
            {status !== "pending"
              ? status === "resolved"
                ? "Success"
                : operation === "Edit"
                ? "Update"
                : operation
              : "Loading..."}
          </SubmitButton>
        </AddWeddingForm>
      )}
      {page === "corporate" && (
        <AddCorporateForm onSubmit={handleSubmit(handleCorporate)}>
          <Title>Add Corporate Content</Title>
          <InputWithIcon
            name="corporateVideoId"
            label="video ID"
            ref={register(schema.videoId)}
            error={errors.corporateVideoId}
            icon={
              "https://chpistel.sirv.com/Connor-Portfolio/3121119-512.png?w=16"
            }
            iconMaxWidth="16px"
            iconPlaceHolderSize="100%"
            toolTipImage={
              "https://chpistel.sirv.com/Connor-Portfolio/tooltipImage.png?w=450"
            }
            toolTipImagePlaceHolderSize="58%"
            toolTipImageBorderRadius="9px"
            toolTipMaxWidth="450px"
            toolTipMessage="Paste the video ID from the url above your choosen video on Vimeo here"
          />
          <Input
            name="company"
            label="Company"
            ref={register(schema.company)}
            error={errors.company}
          />
          <DayPicker
            control={control}
            ref={register}
            label="Date"
            name="jobDate"
            validation={schema.date}
            error={errors.jobDate}
          />
          <TextArea
            name="corporateTestimonial"
            label="Testimonial"
            ref={register(schema.testimonial)}
            error={errors.corporateTestimonial}
          />
          <SubmitButton
            type="submit"
            disabled={status === "pending" ? true : false}
          >
            {status !== "pending"
              ? status === "resolved"
                ? "Success"
                : operation === "Edit"
                ? "Update"
                : operation
              : "Loading..."}
          </SubmitButton>
        </AddCorporateForm>
      )}
    </Container>
  );
};

export default AdminContentForm;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 20px;
`;

const InfoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  border-radius: 9px;
  border: 1px solid black;
  margin-bottom: 22px;
  padding: 14px 14px 14px 12px;
`;

const InfoLabelContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const InfoLabel = styled.label`
  font-size: 0.8rem;
  margin-left: 10px;
`;

const Title = styled.h1`
  margin: 70px 0px;
  text-align: center;
  @media (max-width: 750px) {
    margin: 10% 0px;
    font-size: 1.4rem;
  }
`;

const AddWeddingForm = styled.form`
  width: 100%;
  max-width: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 1024px) {
    margin: 0px;
  }
`;

const AddCorporateForm = styled.form`
  width: 100%;
  max-width: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const NameContainer = styled.div`
  max-width: 1000px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: relative;
  @media (max-width: 609px) {
    flex-direction: column;
  }
`;

const NameInnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  @media (max-width: 609px) {
    flex-direction: column;
    align-items: center;
    margin-bottom: 44px;
  }
`;

const AddPartnerButton = styled.div`
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

const DeletePartnerButton = styled.div`
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

const LocationContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  @media (max-width: 609px) {
    flex-direction: column;
    align-items: center;
  }
`;

const SubmitButton = styled.button`
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
