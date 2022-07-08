import React from 'react';
import { Badge, Button, List, message } from 'antd';

import { TTaskComponent } from '../../../types/task';
import { useTaskContext } from '../../../context/TaskContext';

import './task.css';

const { Item } = List;

const Task: React.FC<TTaskComponent> = ({
  task,
  setSelectedTask,
  setIsAddEditTaskModalOpen,
  fromCompleteTasksModal,
}) => {
  const { handleCompleteTask } = useTaskContext();

  const handleDoneTaskClick = () => {
    handleCompleteTask(task.id);
    message.success('Task Status Changed Successfully!!!', 1);
  };

  const handleEditTaskClick = (event: React.MouseEvent<HTMLInputElement>) => {
    event.stopPropagation();
    setSelectedTask(task);
    setIsAddEditTaskModalOpen(true);
  };

  return (
    <Item
      className={`task-list-item${
        fromCompleteTasksModal ? ' normal-border' : ''
      }`}
    >
      <Item.Meta title={task.title} description={task.description} />
      <div className='task-actions-wrapper'>
        <div>
          {task.priority} <Badge status='error' className='task-badge' />
        </div>
        <div>
          <Button size='small' type='primary' onClick={handleEditTaskClick}>
            Edit Task
          </Button>
          <Button size='small' type='primary' onClick={handleDoneTaskClick}>
            Done Task
          </Button>
        </div>
      </div>
    </Item>
  );
};

export default Task;
