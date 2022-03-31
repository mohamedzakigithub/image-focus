import React, { useEffect, useRef, useState } from "react";
import debounce from "lodash.debounce";
import PropTypes from "prop-types";
import { FocusPicker } from "image-focus";
import smartcrop from "smartcrop";

const startingFocus = { x: -2, y: -2 };

const FocusPickerComponent = ({
  debounceTime = 300,
  imageSrc,
  onFocusChanged
}) => {
  const imageRef = useRef(null);

  const [focusCoordinates, setFocusCoordinates] = useState(startingFocus)


  console.log(focusCoordinates);

  useEffect(() => {
    console.log("imgElRef.current", imageRef.current);
    let imageHTML = imageRef.current;

    const originalWidth = imageHTML.clientWidth
    const originalHeight = imageHTML.clientHeight

    console.log("html image", imageHTML);

    const asyncFn = async () => {
      const cropObj = await smartcrop.crop(imageHTML, {
        width: originalHeight,
        height: originalWidth,
        ruleOfThirds: true,
        minScale: 1.0
      });
      console.log("crop", cropObj.topCrop);

      const { x, y, width, height } = cropObj.topCrop;

      console.log(x);
      console.log(y);
      console.log(width);
      console.log(height);

      const focusX = (x + width/2)/(originalWidth/2) - 1
      const focusY = (y + height/2)/(originalHeight/2) - 1
      console.log(focusX);
      console.log(focusY);

      setFocusCoordinates({ x: focusX, y: focusY })
      
    };
    asyncFn();
  }, [imageSrc]);

  useEffect(() => {
    if (imageRef.current !== null) {
      const debouncedOnFocusChanged = debounce(onFocusChanged, debounceTime);
      new FocusPicker(imageRef.current, {
        onChange: debouncedOnFocusChanged,
        focus: focusCoordinates
      });
    }
  }, [debounceTime, onFocusChanged, focusCoordinates]);

  return <img alt="Focus picker" ref={imageRef} src={imageSrc}/>;
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
