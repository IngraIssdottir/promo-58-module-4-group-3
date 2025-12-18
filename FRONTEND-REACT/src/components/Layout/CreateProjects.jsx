import { useState, useEffect } from "react";
import Hero from "../Layout/Hero.jsx";
import Preview from "../Create/Preview.jsx";
import Form from "../Create/Form.jsx";
import { Link } from "react-router";

const initialData = {
  name: "",
  slogan: "",
  technologies: "",
  repo: "",
  demo: "",
  desc: "",
  autor: "",
  job: "",
  image: null, // Imagen de la Autora
  photo: null, // Imagen del proyecto}
};

function CreateProjects() {
  // const [data, setData] = useState(initialData); // Estábamos sobreescribiendo localStorage
// El useState inicial siempre gana y por eso, al refrescar, localStorage llegaba tarde. 
// La solución está en crear la función data, setData que, al refrescar, nos devuelve lo que la usuaria ha escrito. 


  const [data, setData] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("formData")) || initialData;
    } catch {
      return initialData;
    }
  });

  const [cardURL, setCardURL] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  

   useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(data));
  }, [data]);

  function changeData(property, value) {
    setData({
      ...data,
      [property]: value,
    });
  }

  const handleClick = () => {
    fetch("http://localhost:3000/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((responseData) => {
        if (responseData.success) {
          //esto hace que al postear el proyecto, nos reenvíe a la landing
          //y nos enseñe el proyecto posteado en la misma
          //ese proyecto desaparecerá cuando reiniciemos el servidor
          window.location.href = "/";
        } else {
          setErrorMsg(responseData.error);
          setCardURL("");
        }
      })
      .catch((error) => {
        setErrorMsg("Error al guardar el proyecto: " + error.message);
        setCardURL("");
      });
  };

  return (
    <main className="main">
      <Hero>
        <Link className="button--link" to="/">
          Ver proyectos
        </Link>
      </Hero>
      <Preview data={data} />
      <Form
        changeData={changeData}
        data={data}
        cardURL={cardURL}
        errorMsg={errorMsg}
        handleClick={handleClick}
      />
      <Link to="/" className="back-link">
        ← Volver al inicio
      </Link>
    </main>
  );
}

export default CreateProjects;
