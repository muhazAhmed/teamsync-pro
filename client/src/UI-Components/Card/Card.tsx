import { FC } from "react";

interface CardProps {
  content: any;
  id?: any;
  className?: string;
  style?: any;
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

const Card: FC<CardProps> = ({ content, id, className, style }) => {
  return (
    <div
      style={customCardStyle.container}
      className="custom-card"
      id={id ? id : undefined}
    >
      <div className={className ? className : undefined} style={style}>
        {content}
      </div>
    </div>
  );
};

export default Card;
