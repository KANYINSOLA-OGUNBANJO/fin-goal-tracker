import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import TaskCard from '../components/tasks/TaskCard';
import TaskForm from '../components/tasks/TaskForm';
import Modal from '../components/common/Modal';
import useLocalStorage from '../hooks/useLocalStorage';

function GoalDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [goals, setGoals] = useLocalStorage('fingoal_goals', []);
  const [tasks, setTasks] = useLocalStorage('fingoal_tasks', []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const goal = goals.find(g => g.id === id);
  const goalTasks = tasks.filter(t => t.goalId === id);

  if (!goal) {
    return (
      <div>
        <Navbar />
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h2>Goal not found</h2>
          <button onClick={() => navigate('/goals')} style={{
            marginTop: '1rem',
            padding: '0.75rem 1.5rem',
            backgroundColor: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            Back to Goals
          </button>
        </div>
      </div>
    );
  }

  const handleCreateTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = (taskData) => {
    if (editingTask) {
      setTasks(tasks.map(t => t.id === taskData.id ? taskData : t));
    } else {
      setTasks([...tasks, taskData]);
    }
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter(t => t.id !== taskId));
    }
  };

  const handleToggleStatus = (task) => {
    const newStatus = task.status === 'done' ? 'to_do' : 'done';
    setTasks(tasks.map(t => 
      t.id === task.id 
        ? { ...t, status: newStatus, completedAt: newStatus === 'done' ? new Date().toISOString() : null }
        : t
    ));
  };

  const progress = goal.targetAmount > 0 
    ? Math.round((goal.currentAmount / goal.targetAmount) * 100) 
    : 0;

  const tasksByStatus = {
    to_do: goalTasks.filter(t => t.status === 'to_do'),
    in_progress: goalTasks.filter(t => t.status === 'in_progress'),
    done: goalTasks.filter(t => t.status === 'done')
  };

  return (
    <div>
      <Navbar />
      <div style={{ padding: '2rem', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
        {/* Back Button */}
        <button
          onClick={() => navigate('/goals')}
          style={{
            marginBottom: '1rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#e5e7eb',
            color: '#333',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}
        >
          ← Back to Goals
        </button>

        {/* Goal Header */}
        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '8px',
          marginBottom: '2rem',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          borderLeft: `4px solid ${goal.color || '#10b981'}`
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <div style={{ flex: 1 }}>
              <h1 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>{goal.name}</h1>
              <p style={{ margin: '0 0 1rem 0', color: '#666' }}>{goal.description}</p>
              
              {/* Progress */}
              <div style={{ marginTop: '1rem' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  marginBottom: '0.5rem'
                }}>
                  <span style={{ fontWeight: '500' }}>
                    ${goal.currentAmount.toLocaleString()} / ${goal.targetAmount.toLocaleString()}
                  </span>
                  <span style={{ color: '#10b981', fontWeight: '500' }}>
                    {progress}%
                  </span>
                </div>
                <div style={{
                  width: '100%',
                  height: '10px',
                  backgroundColor: '#e5e7eb',
                  borderRadius: '5px',
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
            </div>
            
            <div style={{ marginLeft: '2rem', textAlign: 'right' }}>
              <span style={{
                padding: '0.5rem 1rem',
                backgroundColor: goal.priority === 'high' ? '#fee2e2' : goal.priority === 'medium' ? '#fef3c7' : '#e0e7ff',
                color: goal.priority === 'high' ? '#dc2626' : goal.priority === 'medium' ? '#d97706' : '#4f46e5',
                borderRadius: '12px',
                fontSize: '0.9rem',
                fontWeight: '500'
              }}>
                {goal.priority} priority
              </span>
              <p style={{ marginTop: '1rem', color: '#666', fontSize: '0.9rem' }}>
                Target: {new Date(goal.targetDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Tasks Section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ margin: 0, color: '#333' }}>Tasks ({goalTasks.length})</h2>
          <button
            onClick={handleCreateTask}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '1rem',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            + Add Task
          </button>
        </div>

        {/* Task Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '6px', textAlign: 'center' }}>
            <p style={{ margin: '0 0 0.5rem 0', color: '#666', fontSize: '0.9rem' }}>To Do</p>
            <h3 style={{ margin: 0, fontSize: '2rem', color: '#d97706' }}>{tasksByStatus.to_do.length}</h3>
          </div>
          <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '6px', textAlign: 'center' }}>
            <p style={{ margin: '0 0 0.5rem 0', color: '#666', fontSize: '0.9rem' }}>In Progress</p>
            <h3 style={{ margin: 0, fontSize: '2rem', color: '#2563eb' }}>{tasksByStatus.in_progress.length}</h3>
          </div>
          <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '6px', textAlign: 'center' }}>
            <p style={{ margin: '0 0 0.5rem 0', color: '#666', fontSize: '0.9rem' }}>Done</p>
            <h3 style={{ margin: 0, fontSize: '2rem', color: '#059669' }}>{tasksByStatus.done.length}</h3>
          </div>
        </div>

        {/* Tasks List */}
        {goalTasks.length === 0 ? (
          <div style={{
            backgroundColor: 'white',
            padding: '3rem',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#333', marginBottom: '1rem' }}>No Tasks Yet</h3>
            <p style={{ color: '#666', marginBottom: '2rem' }}>
              Break down this goal into actionable tasks!
            </p>
            <button
              onClick={handleCreateTask}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '1rem',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              Create First Task
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {goalTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                onToggleStatus={handleToggleStatus}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal for Create/Edit Task */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingTask ? 'Edit Task' : 'Create New Task'}
      >
        <TaskForm
          task={editingTask}
          goalId={id}
          onSave={handleSaveTask}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}

export default GoalDetailPage;