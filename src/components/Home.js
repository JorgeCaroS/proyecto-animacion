import React from "react";
import { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import useRecorder from "./useRecorder";
import Canvas from "./Canvas";

import CharM0 from "../sprites/masculino/Run__000.png";
import CharM1 from "../sprites/masculino/Run__001.png";
import CharM2 from "../sprites/masculino/Run__002.png";
import CharM3 from "../sprites/masculino/Run__003.png";
import CharM4 from "../sprites/masculino/Run__004.png";
import CharM5 from "../sprites/masculino/Run__005.png";
import CharM6 from "../sprites/masculino/Run__006.png";
import CharM7 from "../sprites/masculino/Run__007.png";

import CharMJ0 from "../sprites/masculino/Jump__000.png";
import CharMJ1 from "../sprites/masculino/Jump__001.png";
import CharMJ2 from "../sprites/masculino/Jump__002.png";
import CharMJ3 from "../sprites/masculino/Jump__003.png";
import CharMJ4 from "../sprites/masculino/Jump__004.png";
import CharMJ5 from "../sprites/masculino/Jump__005.png";
import CharMJ6 from "../sprites/masculino/Jump__006.png";
import CharMJ7 from "../sprites/masculino/Jump__007.png";
import CharMJ8 from "../sprites/masculino/Jump__008.png";
import CharMJ9 from "../sprites/masculino/Jump__009.png";

import CharF0 from "../sprites/femenino/Run__000.png";
import CharF1 from "../sprites/femenino/Run__001.png";
import CharF2 from "../sprites/femenino/Run__002.png";
import CharF3 from "../sprites/femenino/Run__003.png";
import CharF4 from "../sprites/femenino/Run__004.png";
import CharF5 from "../sprites/femenino/Run__005.png";
import CharF6 from "../sprites/femenino/Run__006.png";
import CharF7 from "../sprites/femenino/Run__007.png";

export default function Home() {
  const video = React.useRef();
  const history = useHistory();
  const [user, setUser] = useState([]);
  const [escenario, setEscenario] = useState([]);
  const [char, setChar] = useState([]);
  const [escenarioImg, setEscenarioImg] = useState([]);
  const [charImg, setCharImg] = useState([]);
  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(200);
  const [myDraw, setMyDraw] = useState(0);
  const [counter, setCounter] = useState(0);
  const [archivo, setArchivo] = useState([]);
  const [myText, setMyText] = useState("Prueba");
  const [imagesM, setImagesM] = useState([
    CharM0,
    CharM1,
    CharM2,
    CharM3,
    CharM4,
    CharM5,
    CharM6,
    CharM7,
  ]);

  const [imagesMJ, setImagesMJ] = useState([
    CharMJ0,
    CharMJ1,
    CharMJ2,
    CharMJ3,
    CharMJ4,
    CharMJ5,
    CharMJ6,
    CharMJ7,
    CharMJ8,
    CharMJ9,
  ]);
  const [imagesF, setImagesF] = useState([
    CharF0,
    CharF1,
    CharF2,
    CharF3,
    CharF4,
    CharF5,
    CharF6,
    CharF7,
  ]);
  const axios = require("axios");
  let archivoRef = React.createRef();
  let name1Ref = React.createRef();
  let lastname1Ref = React.createRef();
  let mailRef = React.createRef();
  let escenarioRef = React.createRef();
  let imgRef = React.createRef();
  let canvasRef = React.createRef();
  const [loading1, setLoading1] = useState(true);

  const img1 = useRef(null);
  const image1 = img1.current;

  const img2 = useRef(null);
  const image2 = img2.current;
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  ////////////////////////
  function useKeypress(key, action) {
    useEffect(() => {
      function onKeyup(e) {
        if (e.key === key) action();
      }
      window.addEventListener("keyup", onKeyup);
      return () => window.removeEventListener("keyup", onKeyup);
    }, []);
  }

  useKeypress();
  ////////
  useEffect(() => {}, [posY]);

  useEffect(() => {
    async function fetchData() {
      // setUser(history.location.state.user);
      console.log(history.location.state);
      const result = await fetch(
        "http://localhost:3000/api/users/" + history.location.state.user
      );
      var data = await result.json();
      setUser(data);
      console.log(data);
      setLoading1(false);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      await setEscenarioImg("http://localhost:3000/escenario/desierto.jpg");
    }

    fetchData();
  }, [loading1]);

  function verUsuarios() {
    return fetch("http://localhost:3000/api/users/")
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  function postData3(e) {
    console.log(e);
    e.preventDefault();
    subirEscenario(escenarioRef.current.value);
  }

  async function subirEscenario(mail) {
    console.log(archivo);
    console.log(escenarioRef);
    var myFiles = [];
    const data = new FormData();
    data.append("name1", escenarioRef.current.value);
    for (var i = 0; i < archivo.length; i++) {
      //const data = new FormData();
      myFiles.push(archivo[i]);
      data.append("file", myFiles[i]);
      console.log(myFiles[i]);

      await axios
        .post("http://localhost:3000/uploadfile2/" + mail, data, {})
        .then((res) => {
          console.log(res);
        });
    }
    console.log(data.getAll("name1"));
  }

  let [audioURL, isRecording, startRecording, stopRecording] = useRecorder();

  function handleHistorias() {
    return fetch("http://localhost:3000/api/historias/")
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  if (loading1) {
    return (
      <div>
        <h1>Cargando...</h1>
      </div>
    );
  }

  function handleStage(e) {
    console.log(e.key);
    setEscenario(e.key);
    if (e.key === "n") {
      setEscenarioImg("http://localhost:3000/escenario/nieve.jpg");
    } else {
      if (e.key === "d") {
        setEscenarioImg("http://localhost:3000/escenario/desierto.jpg");
      } else {
        return alert("Escenarios disponibles con las letras N - D");
      }
    }
  }

  function handleChar(e) {
    console.log(e.key);
    setChar(e.key);
    if (e.key === "m") {
      return setCharImg(imagesM[0]);
    } else {
      if (e.key === "f") {
        return setCharImg(imagesF[0]);
      } else {
        return alert("Personajes disponibles con las letras M - F");
      }
    }
  }

  async function Jump() {
    var y2 = 200;
    for (var i = 0; i < 6; i++) {
      if (i > 2) {
        y2 = y2 + 20;
        await delay(100);
        setPosY(y2);
      } else {
        y2 = y2 - 20;
        await delay(100);
        setPosY(y2);
      }
    }
  }

  function handlePos(e) {
    if (char === "m") {
      setCounter(counter + 1);
      if (counter === 7) {
        setCounter(0);
      }

      if (e.key === "ArrowRight") {
        setCharImg(imagesM[counter]);
        return setPosX(posX + 2);
      } else {
        if (e.key === "ArrowLeft") {
          setCharImg(imagesM[counter]);
          return setPosX(posX - 2);
        } else {
          if (e.key === "ArrowUp") {
            setCharImg(imagesMJ[counter]);
            Jump();
          }
        }
      }
    } else {
      if (char === "f") {
        setCounter(counter + 1);
        if (counter === 7) {
          setCounter(0);
        }

        if (e.key === "ArrowRight") {
          setCharImg(imagesF[counter]);
          return setPosX(posX + 2);
        } else {
          if (e.key === "ArrowLeft") {
            setCharImg(imagesF[counter]);
            return setPosX(posX - 2);
          }
        }
      }
    }
  }

  function handleReset() {
    setPosX(0);
    setPosY(200);
  }

  const draw = (context) => {
    img1.current.crossOrigin = "Anonymous";
    img2.current.crossOrigin = "Anonymous";
    // Insert your canvas API code to draw an image
    context.drawImage(img1.current, 0, 0);
    context.clearRect(0, 0, 0, 0);
    context.drawImage(img2.current, posX, posY, 45, 80);
    //context.fillRect(25,25,100,100);
    //context.fillStyle = 'green';
   
    
  };

  

  
  

  return (
    <div className="container">
      <h2>Bienvenido {user[0].user}!</h2>
      {/* <h2>Correo: {user[1].mail}</h2>
      <h2>Telefono: {user[2].phone}</h2> */}
      <div className="first-content">
        <div className="imageFromBD" tabIndex="0" onKeyDown={handlePos}>
          <Canvas id="canvas" draw={draw} height={300} width={600} ref={canvasRef} />
          <img
            className="hidden"
            id="img1"
            ref={img1}
            src={escenarioImg}
            width="600px"
            height="300px"
          />
          <img
            className="hidden"
            id="img2"
            ref={img2}
            src={charImg}
            width="50px"
            height="90px"
          />
        </div>

        

        <div className="menu">
          <div className="escenario" tabIndex="0" onKeyDown={handleStage}>
            <h1>Escenarios</h1>
          </div>

          <br></br>

          <div className="personaje" tabIndex="0" onKeyDown={handleChar}>
            <h1>Personajes</h1>
          </div>

          <button onClick={handleReset}>Reset</button>
        </div>
      </div>
      

      <br></br>
      <div className="audio-recorder">
        <audio src={audioURL} controls />
        <button onClick={startRecording} disabled={isRecording}>
          Grabar
        </button>
        <button onClick={stopRecording} disabled={!isRecording}>
          Detener
        </button>
      </div>

      {/* <div className="audioFromBD">
        <audio src={"http://localhost:3000/audio/audio.weba"} controls />
      </div> */}
      <button onClick={handleHistorias}>Historias</button>
      
    </div>
  );
}
