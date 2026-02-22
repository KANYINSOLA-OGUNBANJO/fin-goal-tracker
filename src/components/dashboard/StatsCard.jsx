function StatsCard({ title, value, icon, color }) {
  return (
    <div style={{
      backgroundColor: 'white',
      padding: '1.5rem',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div>
        <p style={{ 
          color: '#666', 
          fontSize: '0.9rem', 
          margin: '0 0 0.5rem 0' 
        }}>
          {title}
        </p>
        <h2 style={{ 
          margin: '0', 
          fontSize: '2rem',
          color: '#333'
        }}>
          {value}
        </h2>
      </div>
      <div style={{
        fontSize: '2.5rem',
        color: color || '#10b981'
      }}>
        {icon}
      </div>
    </div>
  );
}

export default StatsCard;