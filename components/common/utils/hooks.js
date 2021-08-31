import { useRef, useEffect, useState } from "react";
import { errorMessage } from "./errorMessage";
import logger from "../../../pages/api/logger";
import PropTypes from "prop-types";

export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

usePrevious.propTypes = {
  value: PropTypes.any.isRequired,
};

export function useFontLoaded(font) {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const hasFontLoaded = async () => {
      document.fonts.ready.then(async function () {
        try {
          const answer = await document.fonts.check(font);
          setFontLoaded(answer);
        } catch (error) {
          logger.log(error);
          errorMessage();
        }
      });
    };

    hasFontLoaded();

    setFontLoaded(true);
  }, []);
  return [fontLoaded];
}

useFontLoaded.propTypes = {
  font: PropTypes.string.isRequired,
};
