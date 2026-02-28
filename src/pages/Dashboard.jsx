import Navbar from '../components/layout/Navbar';
import ProgressChart from '../components/dashboard/ProgressChart';
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

  const StatCard = ({ title, value, color, delay }) => (
    <div className="slide-in-left" style={{ 
      animationDelay: `${delay}s`, 
      opacity: 0, 
      animation: `slideInLeft 0.6s ease-out ${delay}s forwards` 
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        padding: '1.75rem',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer'
      }}
      className="card-hover">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
          <div>
            <p style={{ 
              margin: '0 0 0.75rem 0', 
              color: 'rgba(255, 255, 255, 0.6)', 
              fontSize: '0.9rem', 
              fontWeight: '500',
              letterSpacing: '0.5px',
              textTransform: 'uppercase'
            }}>
              {title}
            </p>
            <h2 style={{ 
              margin: 0, 
              fontSize: '2.5rem', 
              fontWeight: '700', 
              color: '#FFFFFF' 
            }}>
              {value}
            </h2>
          </div>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.25rem',
            fontWeight: '700',
            color: '#FFFFFF',
            boxShadow: `0 4px 12px ${color}40`
          }}>
            {title.substring(0, 1)}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#0F1419',
      backgroundImage: 'radial-gradient(at 40% 20%, rgba(139, 168, 136, 0.1) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(59, 130, 246, 0.1) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(139, 168, 136, 0.05) 0px, transparent 50%)'
    }}>
      <Navbar />
      <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }} className="page-content">
        {/* Header Section */}
        <div style={{ marginBottom: '2.5rem' }} className="slide-in-up">
          <h1 style={{ 
            margin: '0 0 0.5rem 0', 
            fontSize: '2.5rem',
            fontWeight: '700',
            color: '#FFFFFF',
            letterSpacing: '-0.5px'
          }}>
            Dashboard
          </h1>
          <p style={{ 
            color: 'rgba(255, 255, 255, 0.6)', 
            fontSize: '1.05rem',
            margin: 0 
          }}>
            Track your financial goals and progress
          </p>
        </div>
        
        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2.5rem'
        }}>
          <StatCard title="Total Goals" value={totalGoals} color="linear-gradient(135deg, #8BA888 0%, #6B8E6B 100%)" delay={0.1} />
          <StatCard title="Total Tasks" value={totalTasks} color="linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)" delay={0.2} />
          <StatCard title="To Do" value={tasksToDo} color="linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)" delay={0.3} />
          <StatCard title="In Progress" value={tasksInProgress} color="linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)" delay={0.4} />
          <StatCard title="Completed" value={tasksCompleted} color="linear-gradient(135deg, #34D399 0%, #10B981 100%)" delay={0.5} />
        </div>

        {/* Progress Chart */}
        {totalTasks > 0 && (
          <div className="slide-in-up" style={{ 
            animationDelay: '0.6s', 
            opacity: 0, 
            animation: 'slideInUp 0.6s ease-out 0.6s forwards' 
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              padding: '2rem',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              marginBottom: '2rem'
            }}>
              <ProgressChart goals={goals} tasks={tasks} />
            </div>
          </div>
        )}

        {/* Welcome Message */}
        <div className="slide-in-up" style={{ 
          animationDelay: '0.7s', 
          opacity: 0, 
          animation: 'slideInUp 0.6s ease-out 0.7s forwards' 
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            padding: '2.5rem',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <h2 style={{ 
              marginTop: '0', 
              marginBottom: '1rem', 
              color: '#FFFFFF', 
              fontSize: '1.75rem', 
              fontWeight: '700' 
            }}>
              Welcome to FinGoal
            </h2>
            <p style={{ 
              color: 'rgba(255, 255, 255, 0.7)', 
              lineHeight: '1.8', 
              fontSize: '1.05rem', 
              marginBottom: '1.5rem' 
            }}>
              Track your financial goals and break them down into actionable tasks. 
              Get started by creating your first goal.
            </p>
            {totalGoals === 0 && (
              <button style={{
                padding: '1rem 2rem',
                background: 'linear-gradient(135deg, #8BA888 0%, #6B8E6B 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(139, 168, 136, 0.3)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}>
                Create Your First Goal
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;