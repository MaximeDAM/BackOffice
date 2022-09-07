import React, { useEffect, useState } from "react"
import Project from "./Project"
import randomUser from "../../styles/assets/img/random-user.png"
import axios from "axios"
import FormNewProject from "./FormNewProject"

const ProjectList = () => {
  const [projectList, setProjectList] = useState([])
  const [projectChange, setProjectChange] = useState(true)
  const [newProject, setNewProject] = useState(false)
  const image = randomUser

  const handleFormNewProject = () => {
    setNewProject(true)
  }

  const handleProjectChange = () => {
    setProjectChange(!projectChange)
  }

  const handleDelete = (id) => {
    const confirmation = window.confirm(
      "Voulez vous vraiment supprimer ce projet ?"
    )
    if (confirmation) {
      axios({
        method: "delete",
        url: `${process.env.REACT_APP_API_URL}/api/projects/project/${id}`,
        withCredentials: true,
      })
        .then(() => {
          setProjectChange(!projectChange)
        })
        .catch((err) => console.log(err))
    }
  }

  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/api/projects`,
      withCredentials: true,
    })
      .then((res) => {
        setProjectList(res.data)
      })
      .catch((err) => {
        window.location = "/"
        console.log(err)
      })
  }, [projectChange])

  return (
    <div className="article">
      <div className="tabProject">
        <button
          className="article__btnNewProject"
          onClick={handleFormNewProject}
        >
          Créer un nouveau projet
        </button>
      </div>
      <div className="projectList">
        <div className="project-grid-container">
          <div className="grid-item-project preProject">
            <h2>Prévisualisation</h2>
          </div>
          <div className="grid-item-project titleProject ">
            <h2>Titre</h2>
          </div>
          <div className="grid-item-project dateProject">
            <h2>Date d'ajout ou d'édition</h2>
          </div>
          <div className="grid-item-project actProject">
            <h2>Actions</h2>
          </div>
        </div>

        {projectList.map((item) => {
          return (
            <Project
              title={item.title}
              date={item.updatedAt}
              image={item.picture || image}
              key={item._id}
              idProject={item._id}
              onDelete={() => handleDelete(item._id)}
              onActiveChange={() => handleProjectChange()}
            />
          )
        })}
      </div>
      {newProject && (
        <FormNewProject
          onCancel={() => setNewProject(false)}
          changeRefresh={() => setProjectChange(!projectChange)}
        />
      )}
    </div>
  )
}

export default ProjectList
