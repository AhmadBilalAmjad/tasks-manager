import { useState } from 'react';
import { Affix, Button, Layout, List, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import Task from './Task';
import AddEditModal from './Task/AddEditModal';
import CompletedTasksModal from './CompletedModal';
import { useTaskContext } from '../../context/TaskContext';
import { TTask } from '../../types/task';

import './tasks.css';

const { Content } = Layout;
const { Title } = Typography;

const Tasks = () => {
  const { tasks } = useTaskContext();

  const [isAddEditTaskModalOpen, setIsAddEditTaskModalOpen] =
    useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<TTask | undefined>(
    undefined
  );
  const [isDoneTasksModalOpen, setIsDoneTasksModalOpen] =
    useState<boolean>(false);

  const handleAddTaskClick = () => setIsAddEditTaskModalOpen(true);

  const handleToggleVisible = (status: boolean) => {
    if (selectedTask) {
      setSelectedTask(undefined);
    }
    if (isAddEditTaskModalOpen) {
      setIsAddEditTaskModalOpen(status);
    }
  };

  return (
    <>
      <Content className='task-container'>
        <div className='view-done-tasks-and-heading-wrapper'>
          <Button type='primary' onClick={() => setIsDoneTasksModalOpen(true)}>
            View Done Tasks
          </Button>
          <Title level={2}>Task Manager</Title>
        </div>
        {!!tasks.length ? (
          <List
            itemLayout='horizontal'
            dataSource={tasks.filter((task) => !task.isCompleted)}
            renderItem={(task: TTask) => (
              <Task
                key={task.id}
                task={task}
                setSelectedTask={setSelectedTask}
                setIsAddEditTaskModalOpen={setIsAddEditTaskModalOpen}
              />
            )}
          />
        ) : (
          <Button
            type='primary'
            size='large'
            onClick={() => handleAddTaskClick}
          >
            Add Task
          </Button>
        )}
      </Content>
      {!!tasks.length && (
        <Affix offsetBottom={70}>
          <Button
            className='add-task-icon'
            type='primary'
            shape='circle'
            size='large'
            icon={<PlusOutlined />}
            onClick={handleAddTaskClick}
          />
        </Affix>
      )}
      <AddEditModal
        visible={isAddEditTaskModalOpen}
        task={selectedTask}
        toggleVisible={handleToggleVisible}
      />
      <CompletedTasksModal
        visible={isDoneTasksModalOpen}
        toggleVisible={setIsDoneTasksModalOpen}
      />
    </>
  );
};

export default Tasks;
