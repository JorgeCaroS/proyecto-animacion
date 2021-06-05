import React from "react";
import { useState, useEffect, useRef } from "react";

export default function CrearEscenario() {

    const [archivo, setArchivo] = useState([]);
    let escenarioRef = React.createRef();
    const axios = require("axios");
    let archivoRef = React.createRef();
    let lastname1Ref = React.createRef();
    



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

      function onChange(event) {
        const myFiles = event.target.files;
        setArchivo(myFiles);
        console.log(event.target.files);
      }
    
    
  return (
    <form
      action="/uploadfile"
      method="POST"
      encType="multipart/form-data"
      onSubmit={postData3}
    >
      <label>
        <br></br>
        <span className="text">NAME</span>
        <input type="text" name="escenario" id="escenario" ref={escenarioRef} />
        <br></br>
        <br></br>
        <span className="text">LASTNAME</span>
        <input type="text" name="lastname1" ref={lastname1Ref} />
        <br />
        <br></br>
      </label>

      <input
        className="inputfile"
        type="file"
        name="file"
        id="file"
        ref={archivoRef}
        onChange={onChange}
        multiple
      ></input>
      <br />

      <button type="submit" value="Enviar">
        Guardar
      </button>
    </form>
  );
}
