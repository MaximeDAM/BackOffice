import axios from "axios"
import { useEffect, useState, createContext } from "react"
import IndexRoutes from "./components/routes/IndexRoutes.jsx"

const App = () => {
  const [uid, setUid] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/jwtid`,
      withCredentials: true,
    })
      .then((res) => {
        setUid(res.data)
      })
      .catch((err) => {
        setLoading(false)
        console.log("No token")
      })
      .finally(() => {
        setLoading(false)
      })
  }, [uid])

  setInterval(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/jwtid`,
      withCredentials: true,
    })
      .then((res) => {
        setUid(res.data)
        console.log("refresh interval")
      })
      .catch((err) => {
        setLoading(false)
        console.log("No token")
      })
      .finally(() => {
        setLoading(false)
      })
  }, 60000 * 12)
  return (
    <UidContext.Provider value={uid}>
      <IndexRoutes loading={loading} />
    </UidContext.Provider>
  )
}

export default App
export const UidContext = createContext()
