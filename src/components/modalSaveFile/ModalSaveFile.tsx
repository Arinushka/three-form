import React from 'react';
import { Form, Input, FormInstance } from 'antd';
import styles from '../modalWithForm/modalWithForm.module.css';
import ModalWithForm from '../modalWithForm/ModalWithForm';


interface ModalEditProps {
  isVisible: boolean;
  handleCancel: () => void;
  handleSubmit: () => void;
  title: string;
  form: FormInstance;
}

const ModalSaveFile: React.FC<ModalEditProps> = (props): JSX.Element => {

  const { isVisible, handleCancel, handleSubmit, title, form } = props;

  return (
    <ModalWithForm
      isVisible={isVisible}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      title={title}
      form={form}>
      <Form.Item
        name="name"
        className={styles.formElement}
        rules={[{ required: true, message: 'Пожалуйста, введите название файла!' }, { type: 'string', warningOnly: true }]}>
        <Input placeholder='Введите название файла' className={styles.input} />
      </Form.Item>
    </ModalWithForm>
  )
}

export default ModalSaveFile;