import { useEffect } from "react"
import Maintenance from "../../components/UnderMaintenance/Maintenance"
import "./style.css"
import { usePageName } from "../../utils/commonFunctions"

const Settings = () => {
    useEffect(() => {
        usePageName("Settings")
    }, [])
  return (
    <div><Maintenance/></div>
  )
}

export default Settings