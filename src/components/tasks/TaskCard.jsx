function TaskCard({ task, onEdit, onDelete, onToggleStatus }) {
  const statusColors = {
    to_do: { bg: '#fef3c7', text: '#d97706', label: 'To Do' },
    in_progress: { bg: '#dbeafe', text: '#2563eb', label: 'In Progress' },
    done: { bg: '#d1fae5', text: '#059669', label: 'Done' }
  };

  const priorityColors = {
    high: { bg: '#fee2e2', text: '#dc2626' },
    medium: { bg: '#fef3c7', text: '#d97706' },
    low: { bg: '#e0e7ff', text: '#4f46e5' }
  };

  const status = statusColors[task.status];
  const priority = priorityColors[task.priority];

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '1rem',
      borderRadius: '6px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      borderLeft: `3px solid ${status.text}`
    }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'start',
        marginBottom: '0.75rem'
      }}>
        <h4 style={{ 
          margin: 0, 
          color: '#333',
          textDecoration: task.status === 'done' ? 'line-through' : 'none',
          opacity: task.status === 'done' ? 0.6 : 1
        }}>
          {task.title}
        </h4>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <span style={{
            padding: '0.25rem 0.5rem',
            backgroundColor: priority.bg,
            color: priority.text,
            borderRadius: '4px',
            fontSize: '0.7rem',
            fontWeight: '500'
          }}>
            {task.priority}
          </span>
          <span style={{
            padding: '0.25rem 0.5rem',
            backgroundColor: status.bg,
            color: status.text,
            borderRadius: '4px',
            fontSize: '0.7rem',
            fontWeight: '500'
          }}>
            {status.label}
          </span>
        </div>
      </div>

      {/* Description */}
      {task.description && (
        <p style={{ 
          margin: '0 0 0.75rem 0', 
          color: '#666', 
          fontSize: '0.85rem',
          lineHeight: '1.4'
        }}>
          {task.description}
        </p>
      )}

      {/* Footer */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        fontSize: '0.8rem',
        color: '#888'
      }}>
        <span>
          {task.dueDate && `Due: ${new Date(task.dueDate).toLocaleDateString()}`}
        </span>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => onToggleStatus(task)}
            style={{
              padding: '0.25rem 0.75rem',
              backgroundColor: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.75rem'
            }}
          >
            {task.status === 'done' ? 'Undo' : 'Done'}
          </button>
          <button
            onClick={() => onEdit(task)}
            style={{
              padding: '0.25rem 0.75rem',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.75rem'
            }}
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task.id)}
            style={{
              padding: '0.25rem 0.75rem',
              backgroundColor: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.75rem'
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;