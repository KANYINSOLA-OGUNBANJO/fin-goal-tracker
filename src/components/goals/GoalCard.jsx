function GoalCard({ goal, onEdit, onDelete }) {
  const progress = goal.targetAmount > 0 
    ? Math.round((goal.currentAmount / goal.targetAmount) * 100) 
    : 0;

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '1.5rem',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      borderLeft: `4px solid ${goal.color || '#10b981'}`
    }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'start',
        marginBottom: '1rem'
      }}>
        <div>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>
            {goal.name}
          </h3>
          <p style={{ margin: '0', color: '#666', fontSize: '0.9rem' }}>
            {goal.description}
          </p>
        </div>
        <span style={{
          padding: '0.25rem 0.75rem',
          backgroundColor: goal.priority === 'high' ? '#fee2e2' : goal.priority === 'medium' ? '#fef3c7' : '#e0e7ff',
          color: goal.priority === 'high' ? '#dc2626' : goal.priority === 'medium' ? '#d97706' : '#4f46e5',
          borderRadius: '12px',
          fontSize: '0.75rem',
          fontWeight: '500'
        }}>
          {goal.priority}
        </span>
      </div>

      {/* Progress Bar */}
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          marginBottom: '0.5rem',
          fontSize: '0.9rem'
        }}>
          <span style={{ color: '#666' }}>
            ${goal.currentAmount.toLocaleString()} / ${goal.targetAmount.toLocaleString()}
          </span>
          <span style={{ color: '#10b981', fontWeight: '500' }}>
            {progress}%
          </span>
        </div>
        <div style={{
          width: '100%',
          height: '8px',
          backgroundColor: '#e5e7eb',
          borderRadius: '4px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${progress}%`,
            height: '100%',
            backgroundColor: goal.color || '#10b981',
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>

      {/* Footer */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}>
        <span style={{ fontSize: '0.85rem', color: '#666' }}>
          Target: {new Date(goal.targetDate).toLocaleDateString()}
        </span>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => onEdit(goal)}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.85rem'
            }}
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(goal.id)}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.85rem'
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default GoalCard;