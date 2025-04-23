import { Button } from "@nextui-org/react"
import svg from "../../assets/svg/maintenance.svg"
import { goBack } from "../../utils/commonFunctions"
import "../PageNotFound/style.css"

const Maintenance = () => {
  return (
    <div className="pageNF fadeIn">
        <img src={svg}/>
        <h1>This Page is Under Maintenance, Please Visit After Sometime</h1>
        <Button className="btn-ghost" onPress={goBack}>Back</Button>
    </div>
  )
}

export default Maintenance