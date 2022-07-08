import { useState } from 'react';
import { Affix, Button, Layout, List, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import Task from './Task';
import AddEditModal from './Task/AddEditModal';
import CompletedTasksModal from './CompletedModal';
import ViewTaskModal from './Task/ViewModal';
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
  const [isViewTaskModalOpen, setIsViewTaskModalOpen] =
    useState<boolean>(false);

  const handleAddTaskClick = () => setIsAddEditTaskModalOpen(true);

  const handleToggleVisible = (status: boolean) => {
    if (selectedTask) {
      setSelectedTask(undefined);
    }
    if (isAddEditTaskModalOpen) {
      setIsAddEditTaskModalOpen(status);
    }
    if (isViewTaskModalOpen) {
      setIsViewTaskModalOpen(status);
    }
  };

  return (
    <>
      <Content className='task-container'>
        <div
          className={`${
            !!tasks.length ? 'view-done-tasks-and-heading-wrapper' : ''
          }`}
        >
          {!!tasks.length && (
            <div>
              <Button
                type='primary'
                onClick={() => setIsDoneTasksModalOpen(true)}
              >
                View Done Tasks
              </Button>
            </div>
          )}
          <Title level={2} className='task-manager-heading'>
            Task Manager
          </Title>
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
                setIsViewTaskModalOpen={setIsViewTaskModalOpen}
                setIsAddEditTaskModalOpen={setIsAddEditTaskModalOpen}
              />
            )}
          />
        ) : (
          <div className='add-task-button-wrapper'>
            <Button type='primary' size='large' onClick={handleAddTaskClick}>
              Create Your First Task ;)
            </Button>
          </div>
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
      <ViewTaskModal
        visible={isViewTaskModalOpen}
        task={selectedTask}
        toggleVisible={handleToggleVisible}
        setSelectedTask={setSelectedTask}
        setIsAddEditTaskModalOpen={setIsAddEditTaskModalOpen}
      />
    </>
  );
};

export default Tasks;
