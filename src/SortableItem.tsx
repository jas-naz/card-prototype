// import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export function SortableItem(props: { id: (number | string); }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'move',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {<div style={{
        background: 'oklch(0.55 0.07 203.31)',
        // width: '123px',
        minHeight: '45px',
        borderRadius: '5px',
        marginBottom: '5px',
        padding: '5px',
      }}>Item {props.id}</div>}
    </div>
  );
}
