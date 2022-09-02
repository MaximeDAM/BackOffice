import React from "react";
const Project = ({ title, date, image, onDelete }) => {
  let options = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const num = Date.parse(date);
  const dateFormated = new Date(num).toLocaleDateString("fr-FR", options);
 
  return (
    <div className="project-grid-container">
      <div className="grid-item-project titleProject ">
        <h3>{title}</h3>
      </div>
      <div className="grid-item-project preProject">
        <img src={image} alt="preview" />
      </div>
      <div className="grid-item-project dateProject">
        <p>{dateFormated}</p>
      </div>
      <div className="grid-item-project actProject">
        <button>Editer</button>
        <button onClick={onDelete}>Supprimer</button>
      </div>
    </div>
  );
};

export default Project;
