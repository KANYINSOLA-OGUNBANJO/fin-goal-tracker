import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function DraggableTask({ task, isDragging }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: 'grab'
  };

  const priorityColors = {
    high: { bg: '#fee2e2', text: '#dc2626' },
    medium: { bg: '#fef3c7', text: '#d97706' },
    low: { bg: '#e0e7ff', text: '#4f46e5' }
  };

  const priority = priorityColors[task.priority];

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        backgroundColor: 'white',
        border: '1px solid #e5e7eb',
        borderRadius: '6px',
        padding: '0.75rem',
        boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
        cursor: 'grab'
      }}
      {...attributes}
      {...listeners}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'start',
        marginBottom: '0.5rem'
      }}>
        <h4 style={{
          margin: 0,
          fontSize: '0.95rem',
          color: '#333',
          textDecoration: task.status === 'done' ? 'line-through' : 'none',
          opacity: task.status === 'done' ? 0.6 : 1
        }}>
          {task.title}
        </h4>
        <span style={{
          padding: '0.2rem 0.5rem',
          backgroundColor: priority.bg,
          color: priority.text,
          borderRadius: '4px',
          fontSize: '0.7rem',
          fontWeight: '500',
          flexShrink: 0,
          marginLeft: '0.5rem'
        }}>
          {task.priority}
        </span>
      </div>

      {task.description && (
        <p style={{
          margin: '0 0 0.5rem 0',
          fontSize: '0.8rem',
          color: '#666',
          lineHeight: '1.3'
        }}>
          {task.description}
        </p>
      )}

      {task.dueDate && (
        <div style={{
          fontSize: '0.75rem',
          color: '#888'
        }}>
          📅 {new Date(task.dueDate).toLocaleDateString()}
        </div>
      )}
    </div>
  );
}

export default DraggableTask;