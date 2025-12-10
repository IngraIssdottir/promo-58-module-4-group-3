const Card = ({ data }) => {
  const authorSrc = data?.photo
    ? { backgroundImage: `url(${data.photo})` }
    : undefined;

  return (
    <article className="card">
      <h2 className="card__projectTitle">
        <span className="card__projectTitle--text">Personal project card</span>
      </h2>

      <div className="card__author">
        <div
          className="card__authorPhoto"
          style={authorSrc}
          aria-label={data.name || "Imagen de la autora"}
        >
          {/* background por defecto queda en CSS si no hay data.photo */}
        </div>
        
        <p className="card__job">
          {data.job === "" ? "Monologuista" : data.job}
        </p>
        <h3 className="card__name">
          {data.autor === "" ? "Tomasa" : data.autor}
        </h3>
      </div>

      <div className="card__project">
        <h3 className="card__name">
          {data.name === "" ? "Proyect Tomasa" : data.name}
        </h3>
        <p className="card__slogan">
          {data.slogan === "" ? "Los chistes de Tomasa" : data.slogan}
        </p>
        <h3 className="card__descriptionTitle">Product Description</h3>
        <p className="card__description">
          {data.desc === ""
            ? "Tomasa es esa leyenda urbana capaz de convertir cualquier sitio en una verbena improvisada. Entra en una habitación y automáticamente sube el volumen de la vida: ni Spotify tiene tanta presencia. Lleva el “modo drama-comedia” activado de fábrica, y cuando intenta ser seria, dura menos que un helado en agosto. Eso sí, cuando Tomasa dice “solo un ratito”, prepárate, porque ese ratito tiene la misma duración que una serie de 8 temporadas."
            : data.desc}
        </p>

        <div className="card__technicalInfo">
          <p className="card__technologies">
            {data.technologies === ""
              ? "HTML, CSS, JS y React"
              : data.technologies}
          </p>

          <a
            className="icon icon__www"
            href={data.demo}
            title="Haz click para ver el proyecto online"
          >
            Web link
          </a>
          <a
            className="icon icon__github"
            href={data.repo}
            title="Haz click para ver el código del proyecto"
          >
            GitHub link
          </a>
        </div>
      </div>
    </article>
  );
};

export default Card;
