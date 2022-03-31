import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import FocusedImage from "./focused-image";
import FocusPicker from "./focus-picker";

const App = () => {
  const startingFocus = { x: 0, y: 0 };
  const [focus, setFocus] = useState(startingFocus);
  const [imageUrl, setImageUrl] = useState("https://images.thewest.com.au/publication/C-6232124/b1e6744c8e69762e35141c3fc8c0051c6c25997f-16x9-x0y71w3000h1688.jpg?imwidth=1024&impolicy=wan_v3");


  return (
    <div className="app">
      <h1>Focused Image Picker</h1>
      <div className="container">
        <div className="focus-picker-container">
          <FocusPicker
            imageSrc={imageUrl}
            onFocusChanged={setFocus}
          />
        </div>
        <hr className="spacer" />
        <div className="grid-container">
          <div className="grid">
            <div className="top-left">
              <FocusedImage
                imageSrc={imageUrl}
                x={focus.x}
                y={focus.y}
              />
            </div>
            <div className="top-center">
              <FocusedImage
                imageSrc={imageUrl}
                x={focus.x}
                y={focus.y}
              />
            </div>
            <div className="top-right">
              <FocusedImage
                imageSrc={imageUrl}
                x={focus.x}
                y={focus.y}
              />
            </div>
            <div className="center-left">
              <FocusedImage
                imageSrc={imageUrl}
                x={focus.x}
                y={focus.y}
              />
            </div>
            <div className="center-center">
              <FocusedImage
                imageSrc={imageUrl}
                x={focus.x}
                y={focus.y}
              />
            </div>
            <div className="center-right">
              <FocusedImage
                imageSrc={imageUrl}
                x={focus.x}
                y={focus.y}
              />
            </div>
            <div className="bottom-left">
              <FocusedImage
                imageSrc={imageUrl}
                x={focus.x}
                y={focus.y}
              />
            </div>
            <div className="bottom-center">
              <FocusedImage
                imageSrc={imageUrl}
                x={focus.x}
                y={focus.y}
              />
            </div>
            <div className="bottom-right">
              <FocusedImage
                imageSrc={imageUrl}
                x={focus.x}
                y={focus.y}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
