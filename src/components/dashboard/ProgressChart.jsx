import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

function ProgressChart({ goals, tasks }) {
  // Calculate data for the chart
  const data = [
    {
      name: 'Goals',
      total: goals.length,
      active: goals.filter(g => g.status === 'active').length,
    },
    {
      name: 'Tasks',
      total: tasks.length,
      completed: tasks.filter(t => t.status === 'done').length,
      inProgress: tasks.filter(t => t.status === 'in_progress').length,
      todo: tasks.filter(t => t.status === 'to_do').length,
    }
  ];

  const taskStatusData = [
    { name: 'To Do', value: tasks.filter(t => t.status === 'to_do').length, color: '#d97706' },
    { name: 'In Progress', value: tasks.filter(t => t.status === 'in_progress').length, color: '#2563eb' },
    { name: 'Completed', value: tasks.filter(t => t.status === 'done').length, color: '#10b981' },
  ];

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      marginBottom: '2rem'
    }}>
      <h2 style={{ margin: '0 0 1.5rem 0', color: '#333', fontSize: '1.25rem' }}>
        Task Progress Overview
      </h2>
      
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={taskStatusData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="name" 
            tick={{ fill: '#666' }}
            axisLine={{ stroke: '#e5e7eb' }}
          />
          <YAxis 
            tick={{ fill: '#666' }}
            axisLine={{ stroke: '#e5e7eb' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '4px',
              padding: '10px'
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
              borderRadius: '2px'
            }} />
            <span style={{ fontSize: '0.9rem', color: '#666' }}>
              {item.name}: <strong style={{ color: '#333' }}>{item.value}</strong>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProgressChart;