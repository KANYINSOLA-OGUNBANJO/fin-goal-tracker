import Navbar from '../components/layout/Navbar';
import StatsCard from '../components/dashboard/StatsCard';
import useLocalStorage from '../hooks/useLocalStorage';

function Dashboard() {
  const [goals] = useLocalStorage('fingoal_goals', []);
  const [tasks] = useLocalStorage('fingoal_tasks', []);

  // Calculate stats
  const totalGoals = goals.length;
  const totalTasks = tasks.length;
  const tasksCompleted = tasks.filter(task => task.status === 'done').length;
  const tasksInProgress = tasks.filter(task => task.status === 'in_progress').length;
  const tasksToDo = tasks.filter(task => task.status === 'to_do').length;

  return (
    <div>
      <Navbar />
      <div style={{ padding: '2rem', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
        <h1 style={{ marginBottom: '2rem', color: '#333' }}>Dashboard</h1>
        
        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          <StatsCard 
            title="Total Goals" 
            value={totalGoals}
            icon="🎯"
            color="#10b981"
          />
          <StatsCard 
            title="Total Tasks" 
            value={totalTasks}
            icon="📝"
            color="#3b82f6"
          />
          <StatsCard 
            title="To Do" 
            value={tasksToDo}
            icon="📋"
            color="#f59e0b"
          />
          <StatsCard 
            title="In Progress" 
            value={tasksInProgress}
            icon="⚡"
            color="#8b5cf6"
          />
          <StatsCard 
            title="Completed" 
            value={tasksCompleted}
            icon="✅"
            color="#10b981"
          />
        </div>

        {/* Welcome Message */}
        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ marginTop: '0', color: '#333' }}>
            Welcome to FinGoal! 👋
          </h2>
          <p style={{ color: '#666', lineHeight: '1.6' }}>
            Track your financial goals and break them down into actionable tasks. 
            Get started by creating your first goal!
          </p>
          {totalGoals === 0 && (
            <button style={{
              marginTop: '1rem',
              padding: '0.75rem 1.5rem',
              backgroundColor: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '1rem',
              fontWeight: '500',
              cursor: 'pointer'
            }}>
              Create Your First Goal
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;