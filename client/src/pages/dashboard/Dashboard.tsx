import Toolbar from "../../components/toolbar/Toolbar"
import "./dashboard.css"
import image from "../../assets/svg/dashboard.svg"

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Toolbar/>
      <div className="dashboard-container">
        <div className="section1">
          <div className="flex flex-col gap-3">
            <h1>Good Morning Muhaz</h1>
          <p>Elevate Efficiency, Navigate Insight: Your Dashboard to Success!</p>
          </div>
          <img src={image} alt="SVG"/>
        </div>
        <div className="section2">
          
        </div>
      </div>
    </div>
  )
}

export default Dashboard