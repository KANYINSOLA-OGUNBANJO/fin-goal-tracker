function Skeleton({ type, count = 1 }) {
  const skeletons = Array(count).fill(null);

  if (type === 'goalCard') {
    return (
      <>
        {skeletons.map((_, index) => (
          <div
            key={index}
            style={{
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              animation: 'pulse 1.5s ease-in-out infinite'
            }}
          >
            <div style={{
              height: '24px',
              backgroundColor: '#e5e7eb',
              borderRadius: '4px',
              marginBottom: '1rem',
              width: '70%'
            }} />
            <div style={{
              height: '16px',
              backgroundColor: '#e5e7eb',
              borderRadius: '4px',
              marginBottom: '0.5rem',
              width: '90%'
            }} />
            <div style={{
              height: '8px',
              backgroundColor: '#e5e7eb',
              borderRadius: '4px',
              marginBottom: '1rem',
              width: '60%'
            }} />
            <div style={{
              height: '10px',
              backgroundColor: '#e5e7eb',
              borderRadius: '4px',
              width: '100%'
            }} />
          </div>
        ))}
      </>
    );
  }

  if (type === 'taskCard') {
    return (
      <>
        {skeletons.map((_, index) => (
          <div
            key={index}
            style={{
              backgroundColor: 'white',
              padding: '1rem',
              borderRadius: '6px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              animation: 'pulse 1.5s ease-in-out infinite'
            }}
          >
            <div style={{
              height: '20px',
              backgroundColor: '#e5e7eb',
              borderRadius: '4px',
              marginBottom: '0.75rem',
              width: '60%'
            }} />
            <div style={{
              height: '14px',
              backgroundColor: '#e5e7eb',
              borderRadius: '4px',
              width: '80%'
            }} />
          </div>
        ))}
      </>
    );
  }

  if (type === 'statsCard') {
    return (
      <>
        {skeletons.map((_, index) => (
          <div
            key={index}
            style={{
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              animation: 'pulse 1.5s ease-in-out infinite'
            }}
          >
            <div style={{
              height: '16px',
              backgroundColor: '#e5e7eb',
              borderRadius: '4px',
              marginBottom: '1rem',
              width: '50%'
            }} />
            <div style={{
              height: '40px',
              backgroundColor: '#e5e7eb',
              borderRadius: '4px',
              width: '30%'
            }} />
          </div>
        ))}
      </>
    );
  }

  return null;
}

export default Skeleton;