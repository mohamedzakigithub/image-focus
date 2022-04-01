import React, { useRef, useEffect, useState } from 'react'
import * as faceapi from 'face-api.js'

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

// const uri = '/images/people.jpeg';
// const uri = '/images/girl_2.jpeg';
// const uri = '/images/group_2.jpeg';
const uri = '/images/group_6.jpg';

const drawDot = (ctx, x, y, radius) => {
  ctx.fillStyle = '#000000'
  ctx.beginPath()
  ctx.arc(x, y, radius, 0, 2*Math.PI)
  ctx.fill()
}
const drawRect = (ctx, top, bottom, left, right) => {
  ctx.beginPath();
  ctx.lineWidth = "4";
  ctx.strokeStyle = "green";
  ctx.rect(left, top, right - left, bottom - top);
  ctx.stroke();
}
const drawBackground = (ctx, image, width, height) => {
  ctx.drawImage(image, 0, 0, width, height)
}

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
  }
}

function FaceDetection() {
  const [image, setImage] = useState(null);
  const imageRef = useRef(null);
  const canvasRef = useRef(null);
  
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
    console.log(imageRef.current.src)
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
    
    console.log('Original:', detections)
    canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(imageRef.current);
    const ctx = canvasRef.current.getContext('2d');
    drawBackground(ctx, imageRef.current, canvasSize.width, canvasSize.height);
    console.log(canvasRef.current.innerHtml)
    faceapi.matchDimensions(canvasRef.current, canvasSize);
    const resized = faceapi.resizeResults(detections, canvasSize)
    console.log('RESIZED:', resized)
    faceapi.draw.drawDetections(canvasRef.current, resized);
    faceapi.draw.drawFaceLandmarks(canvasRef.current, resized);

    const results = calculateWeightedCentroid(resized)
    
    
    
    drawDot(ctx, results.centerX, results.centerY, 20);
    drawRect(ctx, results.border.top, results.border.bottom, results.border.left, results.border.right);
    
  }
  const fileHandler = (files) => {
    console.log(files[0])
    let reader = new FileReader();
    reader.onload = function() {
      let image = reader.result;
      setImage(image);
    };
    reader.readAsDataURL(files[0]);
  };

  return (
    <Container maxWidth="sm">
      <Box 
        sx={{ 
          m: 4, 
          display: 'flex', 
          flexDirection: 'column'
        }}
      >
        <Typography variant="h4" component="h1">
          Facial Detection
        </Typography>
        <input
          type="file"
          onChange={e => {
            fileHandler(e.target.files);
          }}
        />
        <img ref={imageRef} src={image} />
        { imageRef.current && <canvas ref={canvasRef} style={{
          border: '4px solid #000000', 
          // backgroundImage: `url(${uri})`, 
          // backgroundPosition: 'center',
          // backgroundSize: 'cover',
          // backgroundRepeat: 'no-repeat'
        }} />}
      
      </Box>
    </Container>
    
  )
}

export default FaceDetection