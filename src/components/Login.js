import React from "react";
import { useState } from "react";
import { useHistory, withRouter } from "react-router-dom";

export default function Login() {
  const history = useHistory();

  let nameRef = React.createRef();  
  let phoneRef = React.createRef();
  let mailRef = React.createRef();
  let passwordRef = React.createRef();
  let mail1Ref = React.createRef();
  let password1Ref = React.createRef();

    function handleReg(e){
        console.log(e)
        e.preventDefault();
        fetch("http://localhost:3000/api/users/registrarse", {
          method: "post",
          mode: "cors",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
    
         
          body: JSON.stringify({
            name: nameRef.current.value,
            mail: mailRef.current.value,
            password: passwordRef.current.value,
            phone: phoneRef.current.value,
           
          })
        })
    }

    
      function handleLog(e){        
          e.preventDefault();
          fetch("http://localhost:3000/api/users/login", {
            method: "post",
            mode: "cors",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
      
          
            body: JSON.stringify({            
              mail: mail1Ref.current.value,
              password: password1Ref.current.value,            
            }),
          }).then((response) => {
              console.log(response);            
              if (response.status === 200) {               
                  history.push({
                      pathname: `/Home`,
                      state: { user: mail1Ref.current.value},
                    });
                };
          })
       
    }


    return(
        <div>
            <form>
            <h1> Registrarse</h1>
            <input className="login-nombre" placeholder="Nombre" ref={nameRef} required/>
            <br/>
            <input className="login-mail" placeholder="Correo"  ref={mailRef} required/>
            <br/>
            <input className="login-password" placeholder="Contraseña" ref={passwordRef} required/>
            <br/>
            <input className="login-phone" placeholder="Telefono" ref={phoneRef} required/>
            <br/>
            <button type="submit" onClick={handleReg} className="login-submit"> Registrarse</button>
            </form>

            <form>
            <h1> Login</h1>
            
            <input className="login-mail" placeholder="Correo"  ref={mail1Ref} required/>
            <br/>
            <input className="login-password" placeholder="Contraseña" ref={password1Ref} required/>
            <br/>            
            <button type="submit" onClick={handleLog} className="login-submit"> Login</button>
            </form>
        </div>
    )
}