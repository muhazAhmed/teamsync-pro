import { FC } from "react";

interface CardProps {
  content: any;
  id?: any;
  className?: string;
  style?: any;
  boxShadow?: boolean;
}

const Card: FC<CardProps> = ({ content, id, className, style, boxShadow = true }) => {
  const cardStyle: React.CSSProperties = {
    borderRadius: "8px",
    padding: "16px",
    minWidth: "20vw",
    backgroundColor: "var(--card)",
    color: "#fff",
    boxShadow: boxShadow ? "-1px 5px 25px var(--primary)" : "none",
  };

  return (
    <div
      style={{ ...cardStyle, ...style }}
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
