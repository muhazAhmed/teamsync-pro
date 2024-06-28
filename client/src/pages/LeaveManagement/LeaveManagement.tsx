import ButtonIcon from "../../UI-Components/Buttons/ButtonIcon";
import Card from "../../UI-Components/Card/Card";
import "./style.css";

const LeaveManagement = () => {
  const holidayList = [
    { label: "Eid", value: "17th Jun, Mon" },
    { label: "Eid", value: "17th Jun, Mon" },
    { label: "Eid", value: "17th Jun, Mon" },
  ];

  return (
    <div className="time-off">
      <div className="header-btn">
        <ButtonIcon
          label="Request Leave"
          className="btn-primary"
          iconPosition="left"
          icon="vacation"
        />
        <ButtonIcon
          label="Leave History"
          className="btn-ghost"
          iconPosition="left"
          icon="clock"
        />
      </div>
      <div className="container">
        <div className="stats">
          <Card
            id="chips"
            content={
              <div className="body">
                <h1>Leave Balance</h1>
                <div className="items-container">
                  <div className="item">
                    <h2>
                      <span>08</span>/12
                    </h2>
                    <h4>Casual Leave</h4>
                  </div>
                  <div className="item">
                    <h2>
                      <span>12</span>/21
                    </h2>
                    <h4>Paid Leave</h4>
                  </div>
                  <div className="item">
                    <h2>
                      <span>02</span>/02
                    </h2>
                    <h4>Restricted Leave</h4>
                  </div>
                </div>
              </div>
            }
          />
          <Card
          className="table-wrapper"
            content={
              <div className="table">
                <table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Leave Type</th>
                      <th>From</th>
                      <th>To</th>
                      <th>Reason</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>12/06/2021</td>
                      <td>Casual Leave</td>
                      <td>12/06/2021</td>
                      <td>12/06/2021</td>
                      <td>Casual Leave</td>
                      <td>Approved</td>
                    </tr>
                    <tr>
                      <td>12/06/2021</td>
                      <td>Casual Leave</td>
                      <td>12/06/2021</td>
                      <td>12/06/2021</td>
                      <td>Casual Leave</td>
                      <td>Approved</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            }
          />
        </div>
        <div className="end-content">
          <Card
            id="holidays"
            content={
              <div className="body">
                <h1>Public Holidays</h1>
                <div
                  className="items-container"
                  style={{ flexDirection: "column" }}
                >
                  {holidayList.map((item: any, index: number) => (
                    <div
                      className="item"
                      key={index}
                      style={{
                        flexDirection: "row",
                        width: "100%",
                        justifyContent: "space-between",
                        borderRadius: "5px",
                      }}
                    >
                      <h2>{item?.label}</h2>
                      <h4>{item?.value}</h4>
                    </div>
                  ))}

                  <h5>See All</h5>
                </div>
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default LeaveManagement;
