import React from 'react';
import { Modal, Form, Input, Button, Radio, message } from 'antd';

import { TTaskModal, TAddEditForm } from '../../../types/task';
import { useTaskContext } from '../../../context/TaskContext';

const { TextArea } = Input;
const { Item } = Form;
const { Group } = Radio;

const rules = [{ required: true }];

const AddEditModal: React.FC<TTaskModal> = ({
  visible,
  task,
  toggleVisible,
}) => {
  const { handleUpdateTask, handleAddTask } = useTaskContext();
  const [form] = Form.useForm();

  if (task) {
    form.setFieldsValue({
      ...task,
    });
  } else {
    form.resetFields();
  }

  const handleFinish = (updatedTask: TAddEditForm) => {
    if (task) {
      handleUpdateTask({
        ...task,
        ...updatedTask,
      });
      message.success('Task Updated Successfully!!!', 1);
    } else {
      handleAddTask({
        id: Math.random() * Math.random(),
        isCompleted: false,
        ...updatedTask,
      });
      message.success('Task Added Successfully!!!', 1);
    }
    form.resetFields();
    toggleVisible(false);
  };

  return (
    <Modal
      title={`${task ? 'Edit' : 'Add'} Task`}
      centered
      visible={visible}
      footer={null}
      width='80vw'
      className='add-edit-modal'
      onCancel={() => {
        form.resetFields();
        toggleVisible(false);
      }}
    >
      <Form form={form} layout='vertical' onFinish={handleFinish} size='large'>
        <Item name='title' rules={rules}>
          <Input placeholder='Task Title' />
        </Item>
        <Item name='description' rules={rules}>
          <TextArea placeholder='Task Description' rows={4} />
        </Item>
        <Item name='kpis' rules={rules}>
          <Input placeholder='Gifts and KPI for this task ;)' />
        </Item>
        <Item name='priority' rules={rules}>
          <Group className='priority-group'>
            <Radio value='low'>Low</Radio>
            <Radio value='medium'>Medium</Radio>
            <Radio value='high'>High</Radio>
          </Group>
        </Item>
        <Item className='submit-button-item'>
          <Button htmlType='submit' type='primary'>
            {task ? 'Save Task' : 'Add To Tasks'}
          </Button>
        </Item>
      </Form>
    </Modal>
  );
};

export default AddEditModal;
