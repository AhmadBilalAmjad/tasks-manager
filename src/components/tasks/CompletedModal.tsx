import React from 'react';
import { Modal, Typography } from 'antd';

import Task from './Task';
import { TTaskModal, TTask } from '../../types/task';
import { useTaskContext } from '../../context/TaskContext';

const { Title } = Typography;

const CompletedTasksModal: React.FC<TTaskModal> = ({
  visible,
  toggleVisible,
}) => {
  const { tasks } = useTaskContext();

  const completedTasks = tasks.filter((task: TTask) => task.isCompleted);

  return (
    <Modal
      title='Completed Tasks'
      centered
      visible={visible}
      footer={null}
      width='80vw'
      onCancel={() => {
        toggleVisible(false);
      }}
    >
      {!!completedTasks?.length ? (
        completedTasks.map((task: TTask) => (
          <Task key={task.id} task={task} fromCompleteTasksModal />
        ))
      ) : (
        <Title level={5} className='no-tasks-done'>
          No Tasks Done
        </Title>
      )}
    </Modal>
  );
};

export default CompletedTasksModal;
