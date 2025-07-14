type SeparatorProps = {
  color?: string;
  width?: string;
  height?: string;
  classname?: string;
};

const Separator = ({
  color = "bg-primary/50",
  width = "full",
  height = "h-[1px]",
  classname,
}: SeparatorProps) => {
  return (
    <div
      className={`${classname} ${color} ${width} ${height} rounded-full opacity-30`}
    ></div>
  );
};

export default Separator;
