import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import FocusedImage from "./focused-image";
import FocusPicker from "./focus-picker";

const App = () => {
  const startingFocus = { x: 0, y: 0 };
  const [focus, setFocus] = useState(startingFocus);

  return (
    <div className="app">
      <h1>Focused Image Picker</h1>
      <div className="container">
        <div className="focus-picker-container">
          <FocusPicker
            imageSrc="https://picsum.photos/2400/1400?image=1001"
            onFocusChanged={setFocus}
          />
        </div>
        <hr className="spacer" />
        <div className="grid-container">
          <div className="grid">
            <div className="top-left">
              <FocusedImage
                imageSrc="https://picsum.photos/2400/1400?image=1001"
                x={focus.x}
                y={focus.y}
              />
            </div>
            <div className="top-center">
              <FocusedImage
                imageSrc="https://picsum.photos/2400/1400?image=1001"
                x={focus.x}
                y={focus.y}
              />
            </div>
            <div className="top-right">
              <FocusedImage
                imageSrc="https://picsum.photos/2400/1400?image=1001"
                x={focus.x}
                y={focus.y}
              />
            </div>
            <div className="center-left">
              <FocusedImage
                imageSrc="https://picsum.photos/2400/1400?image=1001"
                x={focus.x}
                y={focus.y}
              />
            </div>
            <div className="center-center">
              <FocusedImage
                imageSrc="https://picsum.photos/2400/1400?image=1001"
                x={focus.x}
                y={focus.y}
              />
            </div>
            <div className="center-right">
              <FocusedImage
                imageSrc="https://picsum.photos/2400/1400?image=1001"
                x={focus.x}
                y={focus.y}
              />
            </div>
            <div className="bottom-left">
              <FocusedImage
                imageSrc="https://picsum.photos/2400/1400?image=1001"
                x={focus.x}
                y={focus.y}
              />
            </div>
            <div className="bottom-center">
              <FocusedImage
                imageSrc="https://picsum.photos/2400/1400?image=1001"
                x={focus.x}
                y={focus.y}
              />
            </div>
            <div className="bottom-right">
              <FocusedImage
                imageSrc="https://picsum.photos/2400/1400?image=1001"
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
