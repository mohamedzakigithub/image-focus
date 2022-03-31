import React, { useEffect, useRef } from "react";
import debounce from "lodash.debounce";
import PropTypes from "prop-types";
import { FocusPicker } from "image-focus";
import smartcrop from "smartcrop";

const startingFocus = { x: 0.1, y: 0.1 };

const FocusPickerComponent = ({
  debounceTime = 200,
  imageSrc,
  onFocusChanged
}) => {
  const imageRef = useRef(null);

  useEffect(() => {
    console.log("imgElRef.current", imageRef.current);
    let imageHTML = imageRef.current;
    console.log("html image", imageHTML);

    const asyncFn = async () => {
      const cropObj = await smartcrop.crop(imageHTML, {
        width: 500,
        height: 500,
        ruleOfThirds: true,
        minScale: 1.0
      });
      console.log("crop", cropObj.topCrop);

      const { x, y, width, height } = cropObj.topCrop;

      console.log(x);
      console.log(y);
      console.log(width);
      console.log(height);
    };
    asyncFn();
  }, [imageSrc]);

  useEffect(() => {
    if (imageRef.current !== null) {
      const debouncedOnFocusChanged = debounce(onFocusChanged, debounceTime);
      new FocusPicker(imageRef.current, {
        onChange: debouncedOnFocusChanged,
        focus: startingFocus
      });
    }
  }, [debounceTime, onFocusChanged]);

  return <img alt="Focus picker" ref={imageRef} src={imageSrc} />;
};

FocusPickerComponent.defaultProps = {
  onFocusChanged: () => {}
};

FocusPickerComponent.propTypes = {
  debounceTime: PropTypes.number,
  imageSrc: PropTypes.string,
  onFocusChanged: PropTypes.func
};

export default React.memo(FocusPickerComponent);
