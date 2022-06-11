import React from 'react';
import { Form, Input,  FormInstance } from 'antd';
import styles from '../modalWithForm/modalWithForm.module.css';
import ModalWithForm from '../modalWithForm/ModalWithForm';


interface ModalEditProps {
  isVisible: boolean;
  handleCancel: () => void;
  handleSubmit: () => void;
  title: string;
  form: FormInstance;
}

const ModalEditFile: React.FC<ModalEditProps> = (props): JSX.Element => {

  const { isVisible, handleCancel, handleSubmit, title, form } = props;

  return (
    <ModalWithForm
      isVisible={isVisible}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      title={title}
      form={form}>
      <Form.Item
        name="имя"
        label="Имя"
        className={styles.formElement}
        rules={[{ required: true, message: 'Пожалуйста, введите имя!' }, { type: 'string', warningOnly: true }]}>
        <Input placeholder='Введите имя' className={styles.input} />
      </Form.Item>
      <Form.Item
        name="позиция"
        label="Позиция"
        className={styles.formElement}
        rules={[{ required: true, message: 'Пожалуйста, введите позицию!' }, { type: 'string', warningOnly: true }]}>
        <Input placeholder='Введите позицию' className={styles.input} />
      </Form.Item>
      <Form.Item
        name="роль"
        label="Роль"
        className={styles.formElement}
        rules={[{ required: true, message: 'Пожалуйста, введите роль!' }, { type: 'string', warningOnly: true }]}>
        <Input placeholder='Введите роль' className={styles.input} />
      </Form.Item>
      <Form.Item
        name="тип атаки"
        label="Тип атаки"
        className={styles.formElement}
        rules={[{ required: true, message: 'Пожалуйста, введите тип атаки!' }, { type: 'string', warningOnly: true }]}>
        <Input placeholder='Введите тип атаки' className={styles.input} />
      </Form.Item>
      <Form.Item
        name="изображение"
        label="Изображение"
        className={styles.formElement}
        rules={[{ type: 'url', message: 'Изображение должно быть ссылкой' }]}>
        <Input placeholder='Ссылка на изображение' className={styles.input} />
      </Form.Item>
    </ModalWithForm>
  )
}

export default ModalEditFile;