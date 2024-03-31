import "./style.css";
import SVG from "../../assets/svg/errorPage.svg"
import { Button } from "@nextui-org/react";
import { goBack } from "../../utils/commonFunctions";

const PageNotFound = () => {
  return (
    <div className="pageNF">
        <img src={SVG} />
        <Button className="btn-ghost" onClick={goBack}>Back</Button>
    </div>
  )
}

export default PageNotFound