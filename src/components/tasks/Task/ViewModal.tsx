import React from 'react';
import { Modal, Typography, Badge, Button, message } from 'antd';

import { TTaskModal } from '../../../types/task';
import { useTaskContext } from '../../../context/TaskContext';

const { Title, Text } = Typography;

const ViewTaskModal: React.FC<TTaskModal> = ({
  visible,
  task,
  toggleVisible,
  setSelectedTask,
  setIsAddEditTaskModalOpen,
}) => {
  const { handleCompleteTask, handleDeleteTask } = useTaskContext();

  const handleDoneButtonClick = () => {
    if (task?.id) {
      handleCompleteTask(task?.id);
    }
    message.success('Task Status Changed Successfully!!!', 1);
    toggleVisible(false);
  };

  const handleDeleteButtonClick = () => {
    if (task?.id) {
      handleDeleteTask(task?.id);
    }
    message.success('Task Deleted Successfully!!!', 1);
    toggleVisible(false);
  };

  const handleEditButtonClick = () => {
    toggleVisible(false);
    setSelectedTask(task);
    setIsAddEditTaskModalOpen(true);
  };

  return (
    <Modal
      title='View Task'
      centered
      visible={visible}
      footer={null}
      width='80vw'
      onCancel={() => toggleVisible(false)}
    >
      <div className='task-badge-and-title-wrapper'>
        <div>
          <Badge status='error' className='task-badge-in-view-modal' />
          {task?.priority}
        </div>
        <Title level={3}>{task?.title}</Title>
      </div>
      <div className='description-view-modal'>
        <Text>{task?.description}</Text>
      </div>
      <div className='buttons-wrapper-view-modal'>
        <Button type='primary' onClick={handleEditButtonClick}>
          Edit Task
        </Button>
        <Button type='primary' onClick={handleDoneButtonClick}>
          Done Task
        </Button>
        <Button type='primary' danger onClick={handleDeleteButtonClick}>
          Delete Task
        </Button>
      </div>
    </Modal>
  );
};

export default ViewTaskModal;
