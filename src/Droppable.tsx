import { FC, ReactNode } from 'react';
import { useDroppable } from '@dnd-kit/core';

interface DroppableProps {
  id: string;
  children: ReactNode;
}

const Droppable: FC<DroppableProps> = (props) => {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });
  const style: React.CSSProperties = {
    opacity: isOver ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}

export default Droppable;
