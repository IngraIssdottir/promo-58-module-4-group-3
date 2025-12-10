import { useState } from "react";
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
  const [data, setData] = useState({
    ...(JSON.parse(localStorage.getItem("formData")) || initalData),
  });

  function changeData(property, value) {
    setData({
      ...data,
      [property]: value,
    });
    console.log([property], value);
  }
  return (
    <main className="main">
      <Hero>
        <>
          <Link className="button--link" to="/">
            Volver a la página principal
          </Link>
        </>
      </Hero>

      <Preview data={data} />

      <Form changeData={changeData} data={data} />
    </main>
  );
}

export default CreateProjects;
