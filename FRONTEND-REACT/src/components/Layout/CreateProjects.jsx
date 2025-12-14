import { useState, useEffect } from "react";
import Hero from "../Layout/Hero.jsx";
import Preview from "../Create/Preview.jsx";
import Form from "../Create/Form.jsx";
import { Link } from "react-router";



const initalData = {
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

  const [cardURL, setCardURL] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [data, setData] = useState(initalData);
 
  useEffect(() => {
    if (data.name || data.slogan || data.desc) {
      try {
        localStorage.setItem("formData", JSON.stringify(data));
      } catch {}
    }
  }, [data]);

  function changeData(property, value) {
    setData({
      ...data,
      [property]: value,
    });
    console.log([property], value);
  }

  const handleClick = () => {
    fetch("https://dev.adalab.es/api/projectCard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((responseData) => {
        if (responseData.success) {
          const cardURL = responseData.cardURL;
          setCardURL(cardURL);
          setErrorMsg("");
          console.log(cardURL);
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
      <Hero></Hero>
      <Preview data={data} />
      <Form changeData={changeData} data={data} cardURL={cardURL} errorMsg={errorMsg} handleClick={handleClick}/>     
      
    </main>  
  );
  
}

export default CreateProjects;
