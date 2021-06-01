import React from 'react';
import PropTypes from 'prop-types';

const Canvas = ({draw, height, width}) => {
  const canvas = React.useRef();
  const video1 = React.useRef();
  const video2 = React.useRef();

  

  function canvasRecording() {

     var videoStream = canvas.current.captureStream(30);
     var mediaRecorder = new MediaRecorder(videoStream)

      var chunks = [];
      mediaRecorder.ondataavailable = function(e) {
        chunks.push(e.data);
      };

      mediaRecorder.onstop = function(e) {
        var blob = new Blob(chunks, { 'type' : 'video/mp4' });
        chunks = [];
        var videoURL = URL.createObjectURL(blob);
        video1.current.src = videoURL;
      };
      mediaRecorder.ondataavailable = function(e) {
        chunks.push(e.data);
      };

      mediaRecorder.start();
     
      setTimeout(function (){ mediaRecorder.stop(); }, 10000);

/*
    const chunks = []; // here we will store our recorded media chunks (Blobs)
    const stream = canvas.current.captureStream(25); // grab our canvas MediaStream
    const rec = new MediaRecorder(stream); // init the recorder
    video1.current.srcObject = stream;
    // every time the recorder has new data, we will store it in our array
    rec.ondataavailable = e => chunks.push(e.data) ;
    console.log(stream)
    // only when the recorder stops, we construct a complete Blob from all the chunks
    rec.onstop = e => exportVid(new Blob(chunks, {'type' : 'video/mp4' }));
    
    rec.start();
    setTimeout(()=>rec.stop(), 5000); // stop recording in 3s

    video1.current.onplay = function() {
      // Set the source of one <video> element to be a stream from another.
      var stream1 = video1.current.captureStream();
      video2.current.srcObject = stream1;
    };
    */
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
  return (
    <div className="canvas-wraper">
    <canvas id="canvas" ref={canvas} height={height} width={width} />
    <button onClick={canvasRecording}>Grabar</button>
      <div>
      <video className="myVideo"id="video1" ref={video1} height="400px" width="400px" controls />
      </div>
      <div>
      <video className="myVideo"id="video2" ref={video2} height="400px" width="400px" controls />
      </div>
    </div>
  );
};
Canvas.propTypes = {
  draw: PropTypes.func.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};
export default Canvas;