import "./toolbar.css";

const Toolbar = () => {
  const name = location.href.split("/")[3].charAt(0).toUpperCase() + location.href.split("/")[3].slice(1);
  const subName = location?.href.split("/")[4].charAt(0).toUpperCase() + location.href.split("/")[4].slice(1) || "";
  const hasNumber = /\d/.test(subName);

  return (
    <div className="toolbar">
      <h1>/ {name} {!hasNumber ? `/ ${subName}` : null}</h1>
    </div>
  )
}

export default Toolbar