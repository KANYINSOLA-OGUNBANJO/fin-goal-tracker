import { useState } from 'react';
import { DndContext, DragOverlay, closestCorners } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import Column from './Column';
import DraggableTask from './DraggableTask';

function KanbanBoard({ tasks, onUpdateTask }) {
  const [activeId, setActiveId] = useState(null);

  const tasksByStatus = {
    to_do: tasks.filter(t => t.status === 'to_do'),
    in_progress: tasks.filter(t => t.status === 'in_progress'),
    done: tasks.filter(t => t.status === 'done')
  };

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragOver = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeTask = tasks.find(t => t.id === active.id);
    if (!activeTask) return;

    // Check if dropped over a column
    const newStatus = over.id;
    if (['to_do', 'in_progress', 'done'].includes(newStatus)) {
      if (activeTask.status !== newStatus) {
        onUpdateTask({
          ...activeTask,
          status: newStatus,
          completedAt: newStatus === 'done' ? new Date().toISOString() : null
        });
      }
    }
  };

  const handleDragEnd = () => {
    setActiveId(null);
  };

  const activeTask = tasks.find(t => t.id === activeId);

  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1.5rem',
        padding: '2rem',
        backgroundColor: '#f5f5f5',
        minHeight: '80vh'
      }}>
        <Column
          id="to_do"
          title="To Do"
          count={tasksByStatus.to_do.length}
          color="#d97706"
        >
          <SortableContext
            items={tasksByStatus.to_do.map(t => t.id)}
            strategy={verticalListSortingStrategy}
          >
            {tasksByStatus.to_do.map(task => (
              <DraggableTask key={task.id} task={task} />
            ))}
          </SortableContext>
        </Column>

        <Column
          id="in_progress"
          title="In Progress"
          count={tasksByStatus.in_progress.length}
          color="#2563eb"
        >
          <SortableContext
            items={tasksByStatus.in_progress.map(t => t.id)}
            strategy={verticalListSortingStrategy}
          >
            {tasksByStatus.in_progress.map(task => (
              <DraggableTask key={task.id} task={task} />
            ))}
          </SortableContext>
        </Column>

        <Column
          id="done"
          title="Done"
          count={tasksByStatus.done.length}
          color="#059669"
        >
          <SortableContext
            items={tasksByStatus.done.map(t => t.id)}
            strategy={verticalListSortingStrategy}
          >
            {tasksByStatus.done.map(task => (
              <DraggableTask key={task.id} task={task} />
            ))}
          </SortableContext>
        </Column>
      </div>

      <DragOverlay>
        {activeTask ? <DraggableTask task={activeTask} isDragging /> : null}
      </DragOverlay>
    </DndContext>
  );
}

export default KanbanBoard;