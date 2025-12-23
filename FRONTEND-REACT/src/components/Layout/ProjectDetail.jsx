import { useParams, Link } from "react-router";
import { useEffect, useState } from "react";
import Card from "../Create/Card";



function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3000/api/projects/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProject(data.project);
        } else {
          setError(data.error);
        }
      })
      .catch(() => setError("Error al cargar el proyecto"));
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!project) return <p>Cargando proyecto...</p>;

  return (
    <>
      <Card data={project} />
      <Link to="/">← Volver a proyectos</Link>
    </>
  );
}

export default ProjectDetail;