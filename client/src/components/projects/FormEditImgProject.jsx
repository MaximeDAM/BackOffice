import React from "react"

const FormEditImgProject = ({
  urlFile,
  image,
  onCloseEditImg,
  onSetUrlFile,
  onSetFile,
  onSetUrlFileRemove,
  onSetFileRemove,
}) => {
  const handleChangeImg = (e) => {
    onSetUrlFile(e)
    onSetFile(e)
  }
  const handleCancel = (e) => {
    onCloseEditImg()
    onSetUrlFileRemove()
    onSetFileRemove()
  }
  const handleValidImg = () => {
    onCloseEditImg()
  }
  return (
    <div className="article__formEditProject-container">
      <div className="article__formEditProject-container__img">
        <img src={urlFile || image} alt="preview" />
        <label htmlFor="file">Changer l'image</label>
        <input
          type="file"
          id="file"
          name="file"
          accept=".jpg, .jpeg, .png"
          onChange={handleChangeImg}
        />
        <div className="article__formEditProject-container__btns">
          <button onClick={handleCancel} type="button" value="Annuler">
            Annuler
          </button>
          <button onClick={handleValidImg}>Valider</button>
        </div>
      </div>
    </div>
  )
}

export default FormEditImgProject
