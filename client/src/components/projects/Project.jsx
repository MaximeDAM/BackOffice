import axios from "axios"
import React, { useState } from "react"
const Project = ({ idProject, title, date, image, onDelete, onActiveChange }) => {
  const [editIsActive, setEditIsActive] = useState(false)
  const [editFormIsActive, setEditFormIsActive] = useState(false)
  const [titleEdit, setTitleEdit] = useState("")
  let options = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  }
  const num = Date.parse(date)
  const dateFormated = new Date(num).toLocaleDateString("fr-FR", options)

  const handleEdit = () => {
    setEditIsActive(true)
  }
  const handleValidEdit = () => {
    axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}/api/projects/project/${idProject}`,
      withCredentials: true,
      data: {
        titleEdit,
      },
    })
      .then((res) => {
        console.log(res)
         setEditIsActive(false)
         onActiveChange()
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const handleOpenFormEdit = () => {
     setEditIsActive(true)
  }

  return (
    <div className="project-grid-container">
      {!editIsActive ? (
        <>
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
            <button onClick={handleEdit}>Editer</button>
            <button onClick={onDelete}>Supprimer</button>
          </div>
        </>
      ) : (
        <>
          <div className="grid-item-project titleProject ">
            <input
              onChange={(e) => setTitleEdit(e.target.value)}
              type="text"
              id="titre"
              defaultValue={title}
            />
          </div>
          <div className="grid-item-project preProject">
            <button onClick={handleOpenFormEdit} className="btn-img-project" type="button">
              <img src={image} alt="preview" />
            </button>
          </div>
          <div className="grid-item-project dateProject">
            <p>{dateFormated}</p>
          </div>
          <div className="grid-item-project actProject">
            <button onClick={() => setEditIsActive(false)}>Annuler</button>
            <button onClick={handleValidEdit}>Valider</button>
          </div>
        </>
      )}
    </div>
  )
}

export default Project
