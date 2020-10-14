import React, { useState, useEffect } from "react";
import styled from "styled-components";
import lodash from "lodash";
import { useForm } from "react-hook-form";
import { Input } from "../components/common/input";
import { TextArea } from "../components/common/textArea";
import { DayPicker } from "../components/common/dayPicker";
import { ReactSelect } from "../components/common/select";
import { UploadButton } from "../components/common/uploadButton";
import { addWedding } from "../pages/api/weddings";
import { addCorporate } from "../pages/api/corporate";
import { getVimeoData } from "../pages/api/vimeo";
import ImageLoader from "../components/common/imageLoader";

const AdminAddContent = (props) => {
  const [weddingFormVisible, setWeddingFormVisible] = useState(false);
  const [corporateFormVisible, setCorporateFormVisible] = useState(false);
  const [partnersInputLength, setPartnersInputLength] = useState([
    { title: "partner", id: Math.floor(1000 + Math.random() * 9000) },
    { title: "partner", id: Math.floor(1000 + Math.random() * 9000) },
  ]);
  const [status, setStatus] = useState("idle");
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    errors,
  } = useForm();

  const schema = {
    videoId: {
      required: "A video ID is required !",
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
      required: "A date is required !",
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

  const handleAddWeddingSubmit = async (data) => {
    setStatus("pending");
    const dataClone = _.cloneDeep(data);

    // turn object to to array of key, value pairs
    const array = _.toPairsIn(dataClone);

    let partnersArray = [];
    array.map((partner) => {
      for (let i of array) {
        if (
          // each key has its id on the end of the string. I return items that have the same id are not the same,
          // to exclude dupliced of the same string
          partner[0].split("_").pop() === i[0].split("_").pop() &&
          partner[0] !== i[0]
        ) {
          partnersArray.push({
            firstName: partner[1],
            lastName: i[1],
          });
        }
      }
    });
    // filter out every second item in partners array
    dataClone.partners = partnersArray.filter(
      (partner) => partnersArray.indexOf(partner) % 2 === 0
    );
    const response = await addWedding(dataClone);

    if (response) {
      setValue("stateTerritory", "");
      setValue("weddingDate", "");
      reset();
      setStatus("resolved");
    }
  };

  const handleAddCorporateSubmit = async (data) => {
    setStatus("pending");
    const dataClone = _.cloneDeep(data);

    const response = await addCorporate(dataClone);

    if (response) {
      setValue("jobDate", "");
      reset();
      setStatus("resolved");
    }
  };

  const deletePartner = (index) => {
    const partnersInputLengthClone = _.cloneDeep(partnersInputLength);
    if (index > -1 && partnersInputLength.length > 2) {
      partnersInputLengthClone.splice(index, 1);
      setPartnersInputLength(partnersInputLengthClone);
    }
  };

  const addPartner = (index) => {
    const partnersInputLengthClone = _.cloneDeep(partnersInputLength);
    if (index > -1) {
      partnersInputLengthClone.splice(index + 1, 0, {
        title: "partner",
        id: Math.floor(1000 + Math.random() * 9000),
      });
      setPartnersInputLength(partnersInputLengthClone);
    }
  };

  const showWeddingForm = () => {
    setWeddingFormVisible(true);
    setCorporateFormVisible(false);
  };

  const showCorporateForm = () => {
    setCorporateFormVisible(true);
    setWeddingFormVisible(false);
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
      <Title>Choose Which content you would like to add ?</Title>
      <ButtonsContainer>
        <WeddingsFormButton
          weddingFormVisible={weddingFormVisible}
          onClick={showWeddingForm}
        >
          Weddings
        </WeddingsFormButton>
        <CorporateFormButton
          corporateFormVisible={corporateFormVisible}
          onClick={showCorporateForm}
        >
          Corporate
        </CorporateFormButton>
      </ButtonsContainer>
      {weddingFormVisible && (
        <AddWeddingForm onSubmit={handleSubmit(handleAddWeddingSubmit)}>
          <Title>Add Wedding Content</Title>
          <Input
            name="weddingVideoId"
            label="Video ID"
            ref={register(schema.videoId)}
            error={errors.weddingVideoId}
          />
          {partnersInputLength.map((partner) => (
            <NameContainer key={partner.id}>
              <AddPartnerButton
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
          <SubmitButton type="submit">
            {status !== "pending" ? "Add" : "Loading..."}
          </SubmitButton>
        </AddWeddingForm>
      )}
      {corporateFormVisible && (
        <AddCorporateForm onSubmit={handleSubmit(handleAddCorporateSubmit)}>
          <Title>Add Corporate Content</Title>
          <Input
            name="corporateVideoId"
            label="Video ID"
            ref={register(schema.videoId)}
            error={errors.corporateVideoId}
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
          <SubmitButton type="submit">
            {status !== "pending" ? "Add" : "Loading..."}
          </SubmitButton>
        </AddCorporateForm>
      )}
    </Container>
  );
};

export default AdminAddContent;

const Container = styled.div`
  width: calc(100% - 280px);
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 70px;
  @media (max-width: 1250px) {
    width: calc(100% - 200px);
  }
  @media (max-width: 1024px) {
    width: 100%;
    padding: 0px 20px;
    box-sizing: border-box;
  }
`;

const Title = styled.h1`
  margin: 70px 0px;
  text-align: center;
  @media (max-width: 750px) {
    margin: 10% 0px;
    font-size: 1.4rem;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0 20px;
  @media (max-width: 390px) {
    flex-direction: column;
  }
`;

const WeddingsFormButton = styled.button`
  font-size: 1rem;
  color: ${({ weddingFormVisible }) =>
    weddingFormVisible ? "black" : "white"};
  min-height: 54px;
  padding: 14px 30px;
  border-radius: 9px;
  margin-right: 5px;
  border: ${({ weddingFormVisible }) =>
    weddingFormVisible ? "3px solid black" : "3px solid white"};
  font-weight: 600;
  transition: all 0.3s ease-in-out;
  background-image: ${({ theme }) =>
    `radial-gradient( circle farthest-corner at 10% 20%,  ${theme.colors.gradient1} 0%, ${theme.colors.gradient2} 100.2% )`};
  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
  @media (max-width: 390px) {
    margin-bottom: 15px;
  }
`;

const CorporateFormButton = styled.button`
  font-size: 1rem;
  color: ${({ corporateFormVisible }) =>
    corporateFormVisible ? "black" : "white"};
  min-height: 54px;
  padding: 14px 30px;
  margin-left: 5px;
  border: ${({ corporateFormVisible }) =>
    corporateFormVisible ? "3px solid black" : "3px solid white"};
  border-radius: 9px;
  font-weight: 600;
  transition: all 0.3s ease-in-out;
  background-image: ${({ theme }) =>
    `radial-gradient( circle farthest-corner at 10% 20%,  ${theme.colors.gradient1} 0%, ${theme.colors.gradient2} 100.2% )`};
  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: none;
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
  @media (max-width: 609px) {
    order: 4;
    bottom: 22px;
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
  @media (max-width: 609px) {
    position: absolute;
    bottom: 22px;
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
  padding: 18px 80px;
  border-radius: 9px;
  border: none;
  color: white;
  position: relative;
  font-weight: 600;
  transition: all 0.2s ease;
  outline: none;
  background-image: ${({ theme }) =>
    `radial-gradient( circle farthest-corner at 10% 20%,  ${theme.colors.gradient1} 0%, ${theme.colors.gradient2} 100.2% )`};
  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
  &:active {
    transform: scale(0.95);
    outline: 0;
  }
  @media (max-width: 609px) {
    margin-bottom: 60px;
  }
`;
