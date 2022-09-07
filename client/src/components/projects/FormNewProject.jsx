import axios from "axios"
import React, { useRef, useContext } from "react"
import { UidContext } from "../../App"
import randomUser from "../../styles/assets/img/random-user.png"

const FormNewProject = ({ onCancel, changeRefresh }) => {
  const form = useRef(null)
  const image = randomUser
  const uid = useContext(UidContext)

  const handleForm = async (e) => {
    e.preventDefault()
    const dataForm = new FormData(form.current)
    const title = dataForm.get("title")
    const file = dataForm.get("file")
    const picture = file.name

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/api/projects/project`,
      withCredentials: true,
      headers: {
        "content-type": "multipart/form-data",
      },
      data: {
        creatorId: uid,
        title,
        picture,
        file,
      },
    })
      .then((res) => {
        console.log(res)
        console.log(Array.from(dataForm))
        changeRefresh()
        onCancel()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className="article__formNewProject-container">
      <form
        ref={form}
        action=""
        onSubmit={handleForm}
        encType="multipart/form-data"
      >
        <div className="article__formNewProject-container__title">
          <label htmlFor="title">Votre titre de projet</label>
          <input type="text" id="title" name="title" required />
        </div>
        <div className="article__formNewProject-container__img">
          <img src={image} alt="preview" />
          <label htmlFor="file">Télécharger une image</label>
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
