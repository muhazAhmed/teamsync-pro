import { useEffect } from "react"
import "./style.css"
import { usePageName } from "../../../utils/commonFunctions"

const UpdateRequest = () => {
    useEffect(() => {
        usePageName("HR / Update Requests")
    }, [])
  return (
    <div>UpdateRequest</div>
  )
}

export default UpdateRequest