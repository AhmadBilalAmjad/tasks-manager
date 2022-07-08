import React from 'react';
import { Badge, Button, List, message } from 'antd';

import { TTaskComponent } from '../../../types/task';
import { useTaskContext } from '../../../context/TaskContext';

const { Item } = List;

const Task: React.FC<TTaskComponent> = ({ task, setSelectedTask }) => {
  const { handleCompleteTask } = useTaskContext();

  const handleDoneTaskClick = () => {
    handleCompleteTask(task.id);
    message.success('Task Status Changed Successfully!!!', 1);
  };

  return (
    <Item className='task-list-item'>
      <Item.Meta title={task.title} description={task.description} />
      <div className='task-actions-wrapper'>
        <div>
          {task.priority} <Badge status='error' className='task-badge' />
        </div>
        <div>
          <Button
            size='small'
            type='primary'
            onClick={() => setSelectedTask(task)}
          >
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
