import { FC } from "react";

interface CardProps {
  content: any;
  id?: any;
  className?: string;
}

const customCardStyle = {
  container: {
    borderRadius: "8px",
    padding: "16px",
    minWidth: "20vw",
    boxShadow: "-1px 5px 25px var(--primary)",
    backgroundColor: "var(--card)",
    color: "#fff",
  },
};

const Card: FC<CardProps> = ({ content, id, className }) => {
  return (
    <div
      style={customCardStyle.container}
      className="custom-card"
      id={id ? id : undefined}
    >
      <div className={className ? className : undefined}>{content}</div>
    </div>
  );
};

export default Card;
