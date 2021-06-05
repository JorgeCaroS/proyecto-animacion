import React from 'react';
import { useState } from "react";
import PropTypes from 'prop-types';
import useRecorder from "./useRecorder";

const Canvas = ({draw, height, width}) => {
  const canvas = React.useRef();
  const video1 = React.useRef();
  const audio1 = React.useRef();
  const [letter, setLetter] = useState([]);
  let [audioURL, isRecording, startRecording, stopRecording] = useRecorder();

  function canvasRecording() {

     var videoStream = canvas.current.captureStream(30);
     var mediaRecorder = new MediaRecorder(videoStream);   
     

      var chunks = [];
      mediaRecorder.ondataavailable = function(e) {
        chunks.push(e.data);
      };

      mediaRecorder.onstop = function(e) {
        var blob = new Blob(chunks, { 'type' : 'video/mp4;codecs=vp9' });
        chunks = [];
        var videoURL = URL.createObjectURL(blob);
        video1.current.src = videoURL;
      };
      mediaRecorder.ondataavailable = function(e) {
        chunks.push(e.data);
      };

      mediaRecorder.start();
     
       setTimeout(function (){ mediaRecorder.stop(); }, 30000); 


  }

  
  

  function exportVid(blob) {
    const vid = video1.current;
    vid.src = URL.createObjectURL(blob);
    vid.controls = true;
    document.body.appendChild(vid);
    const a = document.createElement('a');
    a.download = 'myvid.mp4';
    a.href = vid.src;
    a.textContent = 'download the video';
    document.body.appendChild(a);
  } 

  //////////////////
  
  //////////////////  

  React.useEffect(() => {
    
    const context = canvas.current.getContext('2d');
    draw(context);
    
  });

  function handlePlay(){
    video1.current.play();
    audio1.current.play();
  }

  /* function handleArduino(){
    return fetch("http://localhost:3000/read/")
    .then((response) => response.json())
    .then((data) => setLetter(data));
          
  } */

  return (
    <div className="canvas-wraper">      
    <canvas id="canvas" ref={canvas} height={height} width={width} />
    <div className="buttons">
    <button onClick={canvasRecording}>Grabar Video</button>
    <button >Detener Video</button>
    </div>
    <br></br>
    <div className="audio-recorder">
        <audio ref={audio1} src={audioURL}  />
        <button onClick={startRecording} disabled={isRecording}>
          Grabar Audio
        </button>
        <button onClick={stopRecording} disabled={!isRecording}>
          Detener
        </button>
      </div>
      <br></br>
      <div>
      <video className="myVideo"id="video1" ref={video1} height="400px" width="400px"  />
      </div>
      <button onClick={handlePlay}>Play</button>
      {/* <button onClick={handleArduino}>Arduino</button> */}
        

    </div>
  );
};
Canvas.propTypes = {
  draw: PropTypes.func.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};
export default Canvas;