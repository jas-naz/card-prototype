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
  const regex = /^1:/i;
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {<div style={{
        background: String(props.id).includes("Spell") ?
          'oklch(0.52 0.07 223.47)' :
          'oklch(0.55 0.07 203.31)',
        color: regex.test(String(props.id)) ?
          'oklch(0.84 0.19 115.95)' :
          'oklch(1 0 89.88)',
        // width: '123px',
        minHeight: '58px',
        borderRadius: '5px',
        marginBottom: '5px',
        padding: '5px',
      }}>Item {props.id}</div>}
    </div>
  );
}
