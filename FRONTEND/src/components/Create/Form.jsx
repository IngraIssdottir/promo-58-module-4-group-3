import "../../styles/Form.scss";
import GetAvatar from "./GetAvatar";
import InputGroupText from "./InputGroupText";
import { useEffect } from "react";

function Form({ changeData, data }) {
  function handleData(ev) {
    ev.preventDefault();
    const property = ev.target.id;
    const value = ev.target.value;
    changeData(property, value);
  }
  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(data));
  }, [data]);

  return (
    <form className="addForm" onChange={handleData}>
      <h2 className="title">Información</h2>
      <fieldset className="addForm__group">
        <legend className="addForm__title">Cuéntanos sobre el proyecto</legend>
        <InputGroupText
          onChange={handleData}
          name="name"
          id="name"
          placeholder="Nombre del proyecto"
          value={data.name}
        />
        <InputGroupText
          onChange={handleData}
          name="slogan"
          id="slogan"
          placeholder="Slogan"
          value={data.slogan}
        />
        <div className="addForm__2col">
          <InputGroupText
            onChange={handleData}
            type="url"
            name="repo"
            id="repo"
            placeholder="Repositorio"
            value={data.repo}
          />
          <InputGroupText
            onChange={handleData}
            type="url"
            name="demo"
            id="demo"
            placeholder="Demo"
          />
        </div>
        <InputGroupText
          onChange={handleData}
          name="technologies"
          id="technologies"
          placeholder="Tecnologías"
          value={data.technologies}
        />
        <textarea
          onChange={handleData}
          className="addForm__input"
          type="text"
          name="desc"
          id="desc"
          placeholder="Descripción"
          rows="5"
          value={data.desc}
        ></textarea>
      </fieldset>

      <fieldset className="addForm__group">
        <legend className="addForm__title">Cuéntanos sobre la autora</legend>
        <InputGroupText
          onChange={handleData}
          name="autor"
          id="autor"
          placeholder="Nombre"
          value={data.author}
        />
        <InputGroupText
          onChange={handleData}
          name="job"
          id="job"
          placeholder="Trabajo"
          value={data.job}
        />
      </fieldset>

      <fieldset className="addForm__group--upload">
        <GetAvatar
          changeData={changeData}
          text="Subir foto del proyecto"
          idImages="image"
        />
        <GetAvatar
          changeData={changeData}
          text="Subir foto de la autora"
          idImages="photo"
        />

        <button className="button--large">Guardar proyecto</button>
      </fieldset>
    </form>
  );
}

export default Form;
