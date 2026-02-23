import { useDroppable } from '@dnd-kit/core';

function Column({ id, title, count, color, children }) {
  const { setNodeRef, isOver } = useDroppable({
    id: id
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        backgroundColor: isOver ? '#f0f9ff' : 'white',
        borderRadius: '8px',
        padding: '1rem',
        minHeight: '500px',
        transition: 'background-color 0.2s',
        border: isOver ? `2px dashed ${color}` : '2px solid transparent'
      }}
    >
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem',
        paddingBottom: '0.75rem',
        borderBottom: `3px solid ${color}`
      }}>
        <h3 style={{
          margin: 0,
          fontSize: '1.1rem',
          color: '#333'
        }}>
          {title}
        </h3>
        <span style={{
          backgroundColor: color,
          color: 'white',
          padding: '0.25rem 0.75rem',
          borderRadius: '12px',
          fontSize: '0.85rem',
          fontWeight: '500'
        }}>
          {count}
        </span>
      </div>

      {/* Tasks */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem'
      }}>
        {children}
      </div>

      {/* Empty state */}
      {count === 0 && (
        <div style={{
          textAlign: 'center',
          color: '#999',
          padding: '2rem 1rem',
          fontSize: '0.9rem'
        }}>
          Drop tasks here
        </div>
      )}
    </div>
  );
}

export default Column;