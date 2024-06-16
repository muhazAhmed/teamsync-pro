import React, { FC } from "react";

interface GridProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  gap?: number;
  columns?: number;
  rows?: number;
  template?: string;
  templateColumns?: string;
  templateRows?: string;
  templateAreas?: string;
  rowGap?: string;
  columnGap?: string;
  rowStart?: number;
  rowEnd?: number;
  columnStart?: number;
  columnEnd?: number;
  rowSpan?: number;
  columnSpan?: number;
  area?: string;
  autoFlow?: string;
  autoColumns?: string;
  autoRows?: string;
  justifyItems?: string;
  justifySelf?: string;
  alignItems?: string;
  alignSelf?: string;
  placeItems?: string;
  placeSelf?: string;
  gridAutoFlow?: string;
  gridAutoColumns?: string;
  gridAutoRows?: string;
  gridTemplateColumns?: string;
  gridTemplateRows?: string;
}

const Grid: FC<GridProps> = ({
  children,
  className,
  style,
  gap,
  template,
  templateColumns,
  templateRows,
  templateAreas,
  rowGap,
  columnGap,
  rowStart,
  rowEnd,
  columnStart,
  columnEnd,
  rowSpan,
  columnSpan,
  area,
  autoFlow,
  autoColumns,
  autoRows,
  justifyItems,
  justifySelf,
  alignItems,
  alignSelf,
  placeItems,
  placeSelf,
  gridAutoFlow,
  gridAutoColumns,
  gridAutoRows,
  gridTemplateColumns,
  gridTemplateRows,
}) => {
  const gridStyles: React.CSSProperties = {
    display: 'grid',
    gap,
    gridTemplate: template,
    gridTemplateColumns: templateColumns || gridTemplateColumns,
    gridTemplateRows: templateRows || gridTemplateRows,
    gridTemplateAreas: templateAreas,
    gridRowGap: rowGap,
    gridColumnGap: columnGap,
    gridAutoFlow: autoFlow || gridAutoFlow,
    gridAutoColumns: autoColumns || gridAutoColumns,
    gridAutoRows: autoRows || gridAutoRows,
    justifyItems,
    justifySelf,
    alignItems,
    alignSelf,
    placeItems,
    placeSelf,
    gridColumnStart: columnStart,
    gridColumnEnd: columnEnd,
    gridRowStart: rowStart,
    gridRowEnd: rowEnd,
    gridRow: rowSpan ? `span ${rowSpan}` : undefined,
    gridColumn: columnSpan ? `span ${columnSpan}` : undefined,
    gridArea: area,
    ...style,
  };

  return (
    <div className={className} style={gridStyles}>
      {children}
    </div>
  );
};

export default Grid;