import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

export interface DragData {
  id: number;
  index: number;
}

export interface CardItem {
  id: number;
  content: string;
}

export interface CardProps {
  data: CardItem;
  index: number;
  swapIndex: Function;
}

const Card: React.FC<CardProps> = (props) => {
  const { data, swapIndex, index } = props;
  const ref = useRef(null);

  const [{ dragging }, drag] = useDrag({
    type: "card",
    item: {
      id: data.id,
      index: index,
    },
    collect: (monitor) => {
      return {
        dragging: monitor.isDragging(),
      };
    },
  });

  const [, drop] = useDrop({
    accept: "card",
    hover: (item: DragData) => {
      swapIndex(index, item.index);
      item.index = index;
    },
  });

  drag(ref);
  drop(ref);

  return (
    <div ref={ref} className={dragging ? "card dragging" : "card"}>
      <span>{data.content}</span>
    </div>
  );
};

export default Card;
