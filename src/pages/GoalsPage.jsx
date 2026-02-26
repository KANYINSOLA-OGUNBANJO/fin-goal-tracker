import { useState } from 'react';
import toast from 'react-hot-toast';
import Navbar from '../components/layout/Navbar';
import GoalCard from '../components/goals/GoalCard';
import GoalForm from '../components/goals/GoalForm';
import Modal from '../components/common/Modal';
import useLocalStorage from '../hooks/useLocalStorage';

function GoalsPage() {
  const [goals, setGoals] = useLocalStorage('fingoal_goals', []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);

  const handleCreateGoal = () => {
    setEditingGoal(null);
    setIsModalOpen(true);
  };

  const handleEditGoal = (goal) => {
    setEditingGoal(goal);
    setIsModalOpen(true);
  };

  const handleSaveGoal = (goalData) => {
    if (editingGoal) {
      // Update existing goal
      setGoals(goals.map(g => g.id === goalData.id ? goalData : g));
      toast.success('Goal updated successfully! 🎯');
    } else {
      // Create new goal
      setGoals([...goals, goalData]);
      toast.success('Goal created successfully! 🎯');
    }
    setIsModalOpen(false);
    setEditingGoal(null);
  };

  const handleDeleteGoal = (goalId) => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      setGoals(goals.filter(g => g.id !== goalId));
      toast.success('Goal deleted successfully');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingGoal(null);
  };

  return (
    <div>
      <Navbar />
      <div style={{ padding: '2rem', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
        {/* Header */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <h1 style={{ margin: 0, color: '#333' }}>Financial Goals</h1>
          <button
            onClick={handleCreateGoal}
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
            + Create New Goal
          </button>
        </div>

        {/* Goals Grid */}
        {goals.length === 0 ? (
          <div style={{
            backgroundColor: 'white',
            padding: '3rem',
            borderRadius: '8px',
            textAlign: 'center',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ color: '#333', marginBottom: '1rem' }}>No Goals Yet</h2>
            <p style={{ color: '#666', marginBottom: '2rem' }}>
              Start by creating your first financial goal!
            </p>
            <button
              onClick={handleCreateGoal}
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
              Create Your First Goal
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '1.5rem'
          }}>
            {goals.map(goal => (
              <GoalCard
                key={goal.id}
                goal={goal}
                onEdit={handleEditGoal}
                onDelete={handleDeleteGoal}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal for Create/Edit */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingGoal ? 'Edit Goal' : 'Create New Goal'}
      >
        <GoalForm
          goal={editingGoal}
          onSave={handleSaveGoal}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
}

export default GoalsPage;