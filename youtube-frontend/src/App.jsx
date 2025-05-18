import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Home } from "./components/home";
import VideoDetails  from "./components/VideoDetails";

function App() {
  return (
    <>
      <div>
        <Home />
        <VideoDetails />
      </div>
    </>
  );
}

export default App;
