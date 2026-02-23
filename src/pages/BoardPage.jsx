import { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import KanbanBoard from '../components/board/KanbanBoard';
import useLocalStorage from '../hooks/useLocalStorage';

function BoardPage() {
  const [tasks, setTasks] = useLocalStorage('fingoal_tasks', []);
  const [goals] = useLocalStorage('fingoal_goals', []);

  const handleUpdateTask = (updatedTask) => {
    setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
  };

  return (
    <div>
      <Navbar />
      <div style={{ 
        padding: '2rem 0',
        backgroundColor: '#f5f5f5', 
        minHeight: '100vh' 
      }}>
        <div style={{ 
          maxWidth: '1400px', 
          margin: '0 auto',
          padding: '0 2rem'
        }}>
          <h1 style={{ 
            marginBottom: '1rem', 
            color: '#333' 
          }}>
            Task Board
          </h1>
          <p style={{ 
            marginBottom: '2rem', 
            color: '#666' 
          }}>
            Drag tasks between columns to update their status
          </p>

          {tasks.length === 0 ? (
            <div style={{
              backgroundColor: 'white',
              padding: '3rem',
              borderRadius: '8px',
              textAlign: 'center',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <h2 style={{ color: '#333', marginBottom: '1rem' }}>No Tasks Yet</h2>
              <p style={{ color: '#666', marginBottom: '2rem' }}>
                Create some goals and tasks to see them here!
              </p>
              <button
                onClick={() => window.location.href = '/goals'}
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
                Go to Goals
              </button>
            </div>
          ) : (
            <KanbanBoard
              tasks={tasks}
              onUpdateTask={handleUpdateTask}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default BoardPage;