import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

function ProgressChart({ goals, tasks }) {
  const taskStatusData = [
    { name: 'To Do', value: tasks.filter(t => t.status === 'to_do').length, color: '#F59E0B' },
    { name: 'In Progress', value: tasks.filter(t => t.status === 'in_progress').length, color: '#3B82F6' },
    { name: 'Completed', value: tasks.filter(t => t.status === 'done').length, color: '#10B981' },
  ];

  return (
    <>
      <h2 style={{ 
        margin: '0 0 1.5rem 0', 
        color: '#FFFFFF', 
        fontSize: '1.25rem',
        fontWeight: '600'
      }}>
        Task Progress Overview
      </h2>
      
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={taskStatusData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
          <XAxis 
            dataKey="name" 
            tick={{ fill: 'rgba(255, 255, 255, 0.7)' }}
            axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
          />
          <YAxis 
            tick={{ fill: 'rgba(255, 255, 255, 0.7)' }}
            axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'rgba(15, 20, 25, 0.95)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              padding: '12px',
              color: '#FFFFFF'
            }}
          />
          <Bar dataKey="value" radius={[8, 8, 0, 0]}>
            {taskStatusData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1rem',
        marginTop: '1.5rem'
      }}>
        {taskStatusData.map((item) => (
          <div key={item.name} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <div style={{
              width: '12px',
              height: '12px',
              backgroundColor: item.color,
              borderRadius: '3px'
            }} />
            <span style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.7)' }}>
              {item.name}: <strong style={{ color: '#FFFFFF' }}>{item.value}</strong>
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

export default ProgressChart;