import React, { useEffect, useRef, useState } from "react";
import debounce from "lodash.debounce";
import PropTypes from "prop-types";
import { FocusPicker } from "image-focus";
import smartcrop from "smartcrop";

const startingFocus = { x: -2, y: -2 };

const FocusPickerComponent = ({
  debounceTime = 300,
  imageSrc,
  onFocusChanged,
  focus,
  faceDetected
}) => {
  const imageRef = useRef(null);

  const [focusCoordinates, setFocusCoordinates] = useState(startingFocus)

  useEffect(() => {
    let imageHTML = imageRef.current;

    const originalWidth = imageHTML.clientWidth
    const originalHeight = imageHTML.clientHeight
  

    const asyncFn = async () => {
      const cropObj = await smartcrop.crop(imageHTML, {
        width: originalHeight,
        height: originalWidth,
        ruleOfThirds: true,
        minScale: 1.0
      });
      const { x, y, width, height } = cropObj.topCrop;
      const focusX = (x + width/2)/(originalWidth/2) - 1
      const focusY = (y + height/2)/(originalHeight/2) - 1

console.log("focus");
console.log(focus);

  if (faceDetected) {
console.log(originalHeight)
    const calcX = 1- Math.abs(focus.x-originalWidth)/(originalWidth/2)
    const calcY = Math.abs(focus.y-originalHeight)/(originalHeight/2) - 1
    console.log(calcX);
    console.log(calcY);
    setFocusCoordinates({ x: calcX, y: calcY })
    console.log("with Face detection");
  }else {
    setFocusCoordinates({ x: focusX, y: focusY })
    console.log("without face detection");
  }
    };
    asyncFn();
  }, [imageSrc, faceDetected]);

  useEffect(() => {
    if (imageRef.current !== null) {
       const debouncedOnFocusChanged = debounce(onFocusChanged, debounceTime);
      new FocusPicker(imageRef.current, {
        onChange: debouncedOnFocusChanged,
        focus: focusCoordinates
      });
    }
  }, [onFocusChanged, focusCoordinates, faceDetected, focus]);

  return <img alt="Focus picker" ref={imageRef} src={imageSrc}/>;
};

FocusPickerComponent.defaultProps = {
  onFocusChanged: () => {}
};

FocusPickerComponent.propTypes = {
  imageSrc: PropTypes.string,
  onFocusChanged: PropTypes.func
};

export default React.memo(FocusPickerComponent);
