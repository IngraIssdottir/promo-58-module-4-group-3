import "../../styles/Preview.scss";
import Card from "./Card";


function Preview({ data }) {
  const projectStyle = data?.image ? { backgroundImage: `url(${data.image})` } : undefined;
  return (
    <section className="preview">
      <div className="projectImage" style={projectStyle} aria-label={data.name || "Imagen del proyecto"}>
        {/* background por defecto queda en CSS si no hay data.image */}
     </div>
      <Card data={data} />
    </section>
  );
}

export default Preview;
