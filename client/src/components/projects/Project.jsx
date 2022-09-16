import axios from "axios"
import React, { useState } from "react"
import FormEditImgProject from "./FormEditImgProject"
const Project = ({
  idProject,
  title,
  date,
  image,
  onDelete,
  onActiveChange,
}) => {
  const [editIsActive, setEditIsActive] = useState(false)
  const [editFormIsActive, setEditImgIsActive] = useState(false)
  const [titleEdit, setTitleEdit] = useState("")
  const [urlFile, setUrlFile] = useState()
  const [file, setFile] = useState()
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

  const handleCancel = () => {
    setUrlFile(null)
    setFile(null)
    setEditIsActive(false)
  }
  const handleEdit = () => {
    setEditIsActive(true)
  }
  const handleValidEdit = () => {
    const titleEdited = titleEdit ? titleEdit : null
    const picture = file ? `./uploads/projects/${file.name}` : null
    console.log(picture)
    console.log(titleEdited)
    const data = {}
    if (picture) {
      data.picture = picture
    }
    if (titleEdited) {
      data.titleEdited = titleEdited
      console.log("test title")
    }
    axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}/api/projects/project/${idProject}`,
      withCredentials: true,
      data,
    })
      .then((res) => {
        console.log(res)
        if (!file) {
          setEditIsActive(false)
          onActiveChange()
        } else {
          axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}/api/projects/project/${idProject}`,
            withCredentials: true,
            headers: {
              "content-type": "multipart/form-data",
            },
            data: {
              file,
            },
          })
            .then((res) => {
              console.log(res)
              setEditIsActive(false)
              onActiveChange()
            })
            .catch((err) => {
              console.log(err)
              console.log("error file")
            })
        }
      })
      .catch((err) => {
        console.log(err)
        console.log("error path picture")
      })
  }
  const handleOpenFormEdit = () => {
    setEditImgIsActive(true)
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
            <button
              onClick={handleOpenFormEdit}
              className="btn-img-project"
              type="button"
            >
              <img src={urlFile || image} alt="preview" />
            </button>
            {editFormIsActive && (
              <FormEditImgProject
                urlFile={urlFile}
                image={image}
                idProject={idProject}
                onCloseEditImg={() => setEditImgIsActive(false)}
                onSetUrlFile={(e) =>
                  setUrlFile(URL.createObjectURL(e.target.files[0]))
                }
                onSetUrlFileRemove={(e) => setUrlFile(null)}
                onSetFileRemove={(e) => setFile(null)}
                onSetFile={(e) => setFile(e.target.files[0])}
              />
            )}
          </div>
          <div className="grid-item-project dateProject">
            <p>{dateFormated}</p>
          </div>
          <div className="grid-item-project actProject">
            <button onClick={handleCancel}>Annuler</button>
            <button onClick={() => handleValidEdit()}>Valider</button>
          </div>
        </>
      )}
    </div>
  )
}

export default Project
