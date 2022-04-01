import React, { useState, useEffect, useRef } from "react";
import * as faceapi from 'face-api.js'
import "./styles.css";
import FocusedImage from "./focused-image";
import CombinedFocusPicker from "./combined-focus-picker";


const getMeanAndSd = (array) => {
  const n = array.length
  const mean = array.reduce((a, b) => a + b) / n
  return {
    mean,
    sd: Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n),
  }
}

const calculateWeightedCentroid = (detections) => {
  let faceInfo = [];

  const centerX = detections?.[0]?.detection?.imageWidth / 2;
  const centerY = detections?.[0]?.detection?.imageHeight / 2;

  faceInfo = detections?.map(ele => {
    
    const faceCenterX = ( ele?.detection?.box?.left + ele?.detection?.box?.right ) / 2;
    const faceCenterY = ( ele?.detection?.box?.top + ele?.detection?.box?.bottom ) / 2;
    const distanceWeightX = 1 - Math.abs(faceCenterX - centerX) / centerX;
    const distanceWeightY = 1 - Math.abs(faceCenterY - centerY) / centerY;
    const distanceWeight = (distanceWeightX + distanceWeightY) / 2;

    return {
      top: ele.detection.box.top,
      bottom: ele.detection.box.bottom,
      left: ele.detection.box.left,
      right: ele.detection.box.right,
      faceCenterX,
      faceCenterY,
      area: ele.detection.box.area,
      scoreWeight: ele.detection.classScore,
      distanceWeight: distanceWeight,
    }
  })

  const maxArea = Math.max(...faceInfo.map(fi => fi.area));
  faceInfo = faceInfo.map(fi => {
    return {
      ...fi,
      areaWeight: fi.area / maxArea,
    }
  })

  const sums = faceInfo.reduce((prev, curr) => {
    const weightAverage = (curr.scoreWeight + curr.distanceWeight + curr.areaWeight) / 3;
    return {
      ...prev,
      weightSum: prev.weightSum + weightAverage,
      weightedXSum: prev.weightedXSum + curr.faceCenterX * weightAverage,
      weightedYSum: prev.weightedYSum + curr.faceCenterY * weightAverage,
    }
  }, {weightSum: 0, weightedXSum: 0, weightedYSum: 0});
  const x = sums.weightedXSum / sums.weightSum;
  const y = sums.weightedYSum / sums.weightSum;

  const distances = faceInfo.map(fi => Math.sqrt(Math.pow((x - fi.faceCenterX), 2) + Math.pow((y - fi.faceCenterY), 2)));

  const {mean, sd} = getMeanAndSd(distances);
  const numOfSdArray = distances.map(dis => Math.abs((dis - mean) / sd));
  const faceSelected = numOfSdArray.map(val => val > 2 ? 0 : 1);

  const border = faceInfo.reduce((prev, curr, currIdx) => {
    if (!faceSelected[currIdx]) return prev;
    return {
      ...prev,
      top: prev.top < curr.top ? prev.top : curr.top,
      bottom: prev.bottom > curr.bottom ? prev.bottom : curr.bottom,
      left: prev.left < curr.left ? prev.left: curr.left,
      right: prev.right > curr.right ? prev.right : prev.right,
    }
  })

  return {
    centerX: x,
    centerY: y,
    border,
    faceInfo
  }
}


const Combined = () => {
  const startingFocus = {x:0, y:0};
  const [image, setImage] = React.useState(null);
  const [focus, setFocus] = useState(startingFocus);
  const [faceDetected, setFaceDetected] =useState(null)
  const imageRef = useRef(null);


  const fileHandler = files => {
    setFaceDetected(null)
    let reader = new FileReader();
    reader.onload = function() {
      let image = reader.result;
      setImage(null)
      setImage(image);
    };
    reader.readAsDataURL(files[0]);
    
  };

useEffect(() => {
  console.log('Initialize')
  const loadModels = () => {
    Promise.all([
      faceapi.nets.ssdMobilenetv1.loadFromUri('./models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
      
    ]).catch(e => console.log(e))
  }
  imageRef.current && loadModels();
}, [])

useEffect(() => {
  if(imageRef.current.src) {
    handleImage();
  }
}, [image])


const handleImage = async () => {
  const canvasSize = {
    width: imageRef.current.offsetWidth,
    height: imageRef.current.offsetHeight,
  }
  
  const detections = await faceapi
  .detectAllFaces(imageRef.current)
  .withFaceLandmarks()

  if (detections.length > 0) {
    // const resized = faceapi.resizeResults(detections, canvasSize)
    const results = calculateWeightedCentroid(detections)
    setFocus({x:results.centerX, y:results.centerY})
    setFaceDetected(true)
  }else {
    console.log("No face Detected");
    setFaceDetected(false)
  }
  
}
  return (
   <div className="app">
      <h1>Combined Focal Point Detection Algorithm</h1>
      <h2>{image ? faceDetected ? "Face/s Detected" : "No Face/s Detected": null}</h2>
      <input
        type="file"
        onChange={e => {
          fileHandler(e.target.files);
        }}
      /> 
      <br/>
      <br/>
      {image && <div className="container">
        <div className="focus-picker-container">
          {faceDetected !== null && <CombinedFocusPicker
            imageSrc={image}
            onFocusChanged={setFocus}
            focus = {focus}
            faceDetected={faceDetected}
          />}
          
        </div>
        <hr className="spacer" />
        <div className="grid-container">
          <div className="grid">
            <div className="top-left">
              <FocusedImage
                imageSrc={image}
                x={ focus.x}
                y={ focus.y}
              />
            </div>
            <div className="top-center">
              <FocusedImage
                imageSrc={image}
                x={focus.x}
                y={focus.y}
              />
            </div>
            <div className="top-right">
              <FocusedImage
                imageSrc={image}
                x={focus.x}
                y={focus.y}
              />
            </div>
            <div className="center-left">
              <FocusedImage
                imageSrc={image}
                x={focus.x}
                y={focus.y}
              />
            </div>
            <div className="center-center">
              <FocusedImage
                imageSrc={image}
                x={focus.x}
                y={focus.y}
              />
            </div>
            <div className="center-right">
              <FocusedImage
                imageSrc={image}
                x={focus.x}
                y={focus.y}
              />
            </div>
          </div>
        </div>
      </div>}
      <img ref={imageRef} src={image} />
    </div>
    
  );
};

export default Combined
