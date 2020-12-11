import styled, { createGlobalStyle } from "styled-components";
import React, { useState, useEffect, useRef } from "react";
import Videos from "./common/videos";
import {
  getAllPricingPackages,
  getAddOns,
  updateAddOns,
  deletePricingPackage,
  updatePricingPackages,
} from ".././pages/api/pricing";
import _ from "lodash";
import cloneDeep from "lodash/cloneDeep";
import moment from "moment";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import { handleWeddingNames } from "./common/utils/handleWeddingName";
import { bundleDualInputValuesIntoObj } from "./common/utils/bundleDualInputValuesIntoObj";
import { bundleSingleInputValueIntoObj } from "./common/utils/bundleSingleInputValueIntoObj";
import AdminContentForm from "./common/adminContentForm";
import AdminPricingForm from "./adminPricingForm";
import AdminPricing from "./common/adminPricing";
import downWave from ".././public/images/wave3.svg";
import popSound from ".././public/sounds/pop.mp3";
import useSound from "use-sound";
import { updatePricingPackage } from "../pages/api/pricing";
import { DeletePopupOverlay } from "./deletePopupOverlay";
import AdminButtonsSection from "./common/adminButtonSections";
import WeddingPricingPackages from "./weddingPricingPackages";
import WeddingPricingAddOns from "./weddingPricingAddOns";

const AdminEditContent = ({ operation }) => {
  return <AdminPricing operation="Edit" />;
};

export default AdminEditContent;
