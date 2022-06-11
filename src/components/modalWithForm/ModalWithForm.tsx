import React from 'react';
import { Form, Input, Modal, Button, FormInstance } from 'antd';

import styles from './modalWithForm.module.css';
// import { MaskedInput } from 'antd-mask-input';

interface ModalWithFormProps {
  isVisible: boolean;
  handleCancel: () => void;
  handleSubmit: () => void;
  title: string;
  form: FormInstance;
  children: any;
}

const ModalWithForm: React.FC<ModalWithFormProps> = (props): JSX.Element => {

  const { isVisible, handleCancel, handleSubmit, title, form, children } = props;

  return (
    <Modal
      className={styles.modal}
      title={title}
      visible={isVisible}
      onCancel={handleCancel}
      width="40%"
      footer={[<Button key="submit" className={styles.button} htmlType="submit" onClick={handleSubmit}>Сохранить</Button>]}>
      <Form form={form} autoComplete="off">
      {children}
      </Form>
    </Modal>
  )
}

export default ModalWithForm;