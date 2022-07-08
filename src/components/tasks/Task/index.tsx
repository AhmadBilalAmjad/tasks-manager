import React from 'react';
import { Badge, Button, List, message } from 'antd';

import { TTaskComponent } from '../../../types/task';
import { useTaskContext } from '../../../context/TaskContext';

import './task.css';

const { Item } = List;

const Task: React.FC<TTaskComponent> = ({
  task,
  setSelectedTask,
  fromCompleteTasksModal = false,
  setIsViewTaskModalOpen,
  setIsAddEditTaskModalOpen,
}) => {
  const { handleCompleteTask } = useTaskContext();

  const handleDoneTaskClick = (event: React.MouseEvent<HTMLInputElement>) => {
    event.stopPropagation();
    handleCompleteTask(task.id);
    message.success('Task Status Changed Successfully!!!', 1);
  };

  const setTaskAndOpenModal = (openViewTaskModal: boolean = false) => {
    setSelectedTask(task);
    openViewTaskModal
      ? setIsViewTaskModalOpen(true)
      : setIsAddEditTaskModalOpen(true);
  };

  const handleListItemClick = () => {
    if (!fromCompleteTasksModal) {
      setTaskAndOpenModal(true);
    }
  };

  const handleEditTaskClick = (event: React.MouseEvent<HTMLInputElement>) => {
    event.stopPropagation();
    setTaskAndOpenModal();
  };

  return (
    <Item
      className={`task-list-item${
        fromCompleteTasksModal ? ' normal-border' : ''
      }`}
      onClick={handleListItemClick}
    >
      <Item.Meta title={task.title} description={task.description} />
      <div className='task-actions-wrapper'>
        <div>
          {task.priority} <Badge status='error' className='task-badge' />
        </div>
        {!fromCompleteTasksModal && (
          <div>
            <Button size='small' type='primary' onClick={handleEditTaskClick}>
              Edit Task
            </Button>
            <Button size='small' type='primary' onClick={handleDoneTaskClick}>
              Done Task
            </Button>
          </div>
        )}
      </div>
    </Item>
  );
};

export default Task;
