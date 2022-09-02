import axios from "axios"
import React, { useRef } from "react"
import randomUser from "../../styles/assets/img/random-user.png"

const FormNewProject = ({ onCancel }) => {
  const form = useRef(null)
  const image = randomUser

  const handleForm = async (e) => {
    e.preventDefault()
    const data = new FormData(form.current)
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/api/projects/project`,
      data,
    })
      .then((res) => {
        console.log("success")
      })
      .catch((err) => {
        console.log(err)
        console.log(Array.from(data))
      })
  }

  return (
    <div className="article__formNewProject-container">
      <form ref={form} action="" onSubmit={handleForm}>
        <div className="article__formNewProject-container__title">
          <label htmlFor="title">Votre titre de projet</label>
          <input type="text" id="title" name="title" />
        </div>
        <div className="article__formNewProject-container__img">
          <img src={image} alt="preview" />
          <label htmlFor="file">Changer d'image</label>
          <input type="file" id="file" name="file" accept=".jpg, .jpeg, .png" />
        </div>
        <div className="article__formNewProject-container__btns">
          <button onClick={onCancel} type="button" value="Annuler">
            Annuler
          </button>
          <input type="submit" value="Envoyer" />
        </div>
      </form>
    </div>
  )
}

export default FormNewProject
