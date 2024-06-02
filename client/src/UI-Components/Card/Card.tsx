import { FC } from "react";

interface CardProps {
  content: any;
  id?: any;
}

const customCardStyle = {
  container: {
    borderRadius: "8px",
    padding: "16px",
    minWidth: "20vw",
    boxShadow: "-1px 5px 25px var(--primary)",
    backgroundColor: "#fff",
    color: "black",
  },
};

const Card: FC<CardProps> = ({ content, id }) => {
  return (
    <div
      style={customCardStyle.container}
      className="custom-card"
      id={id ? id : undefined}
    >
      <div>{content}</div>
    </div>
  );
};

export default Card;
