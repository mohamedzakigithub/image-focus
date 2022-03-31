import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import FocusedImage from "./focused-image";
import FocusPicker from "./focus-picker";

const App = () => {
  const startingFocus = { x: 0, y: 0 };
  const [image, setImage] = React.useState(null);
  const [focus, setFocus] = useState(startingFocus);

console.log(image);

  const fileHandler = files => {
    let reader = new FileReader();
    reader.onload = function() {
      let image = reader.result;
      setImage(null)
      setImage(image);
    };
    reader.readAsDataURL(files[0]);
  };
  return (
    <div className="app">
      <h1>Focused Image Picker</h1>
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
          <FocusPicker
            imageSrc={image}
            onFocusChanged={setFocus}
          />
        </div>
        <hr className="spacer" />
        <div className="grid-container">
          <div className="grid">
            <div className="top-left">
              <FocusedImage
                imageSrc={image}
                x={focus.x}
                y={focus.y}
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
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
