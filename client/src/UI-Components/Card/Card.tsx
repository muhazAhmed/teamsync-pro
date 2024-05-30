import { FC } from "react";

interface CardProps {
  content: any;
}

const customCardStyle = {
  container: {
    borderRadius: "8px",
    padding: "16px",
    minWidth: "20vw",
    boxShadow: "0 4px 8px rgba(3, 3, 3, 2)",
    backgroundColor: "#fff",
    color: "black",
  },
};

const Card: FC<CardProps> = ({ content }) => {
  return (
    <div style={customCardStyle.container} className="custom-card">
      <div>{content}</div>
    </div>
  );
};

export default Card;
