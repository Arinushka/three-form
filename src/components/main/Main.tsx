import { Tabs, Button, notification, FormInstance } from 'antd';
import 'antd/dist/antd.css'
import React, { useEffect, useState } from 'react';
import { useForm } from 'antd/lib/form/Form';
import styles from './main.module.css'
import { Element, Skill, Character, ValidationError } from '../../types';
import { connect, useDispatch } from 'react-redux';
import { loaded } from '../../store/reducers/file/actions';
import { AppState } from '../../store/reducers';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import ModalEditFile from '../modalEditFile/ModalEditFile';
import ModalSaveFile from '../modalSaveFile/ModalSaveFile';


interface MainProps {
  file: { data: Element[] }
}


const Main: React.FC<MainProps> = (props): JSX.Element => {

  const { TabPane } = Tabs;
  const { file } = props;

  const [isVisibleItems, setIsVisibleItems] = useState<boolean>(false);
  const [isVisibleModalSaveFile, setIsVisibleModalSaveFile] = useState<boolean>(false);
  const [isVisibleModalEditFile, setIsVisibleModalEditFile] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<any>({});
  const [activeItems, setActiveItems] = useState<Character[]>([]);

  const dispatch = useDispatch();

  const [formSaveFile] = useForm();
  const [formEditFile] = useForm();

  let keys: string[] = []
  let values: any;


  const closeModal = (): void => {
    setIsVisibleModalSaveFile(false)
    setIsVisibleModalEditFile(false)
  }

  const showItems = (evt: any, items: Character[]): void => {
    setIsVisibleItems(!isVisibleItems);
    setActiveItems(items)
    if (evt.target.children.length !== 0) {
      if (evt.target.children[0].className === `${styles.hidden}`) {
        evt.target.children[0].className = styles.item
      } else {
        evt.target.children[0].className = styles.hidden
      }
    }
  }


  const showTableItem = (item: Character): void => {
    setActiveItem(item)
  }


  const getFile = (event: any): void => {
    const reader: any = new FileReader();
    reader.readAsText(event.target.files[0]);
    reader.onload = () => {
      dispatch(loaded(JSON.parse(reader.result)));
    };
  }

  const saveFile = (): void => {
    const blob: Blob = new Blob([JSON.stringify(file)], { type: "application/json" });
    const link = document.createElement("a")
    link.setAttribute("href", URL.createObjectURL(blob))
    link.setAttribute("download", `${formSaveFile.getFieldsValue().name}`)
    link.click()
    link.remove()
    setIsVisibleModalSaveFile(false);
    formSaveFile.resetFields();
  }

  const checkValidateForm = (form: FormInstance, successCallback: any): void => {
    form.validateFields().then(successCallback, error => failureCallback(error))
  }

  const failureCallback = (error: ValidateErrorEntity): void => {
    notification.error({
      description: error.errorFields.map((error: ValidationError) => error.errors),
      message: "Заполните все обязательные поля формы"
    })
  }

  const handleSaveFile = (): void => {
    checkValidateForm(formSaveFile, saveFile)
  };

  const editFile = (evt: any): void => {
    const newData = formEditFile.getFieldsValue();
    const index = activeItems.indexOf(activeItem)
    activeItems.splice(index, 1, newData);
    setActiveItem(newData)
    dispatch(loaded(file.data))
    setIsVisibleModalEditFile(false);
  }


  const handleEditFile = (): void => {
    checkValidateForm(formEditFile, editFile)
  }


  const openEditModal = (): void => {
    formEditFile.setFieldsValue(activeItem)
    setIsVisibleModalEditFile(true)
  }

  return (
    <>
      <div className={styles.wrapButtons}>
        <input className={styles.file} type="file" accept="application/json" onChange={getFile}></input>
        {file.data.length > 0 && <> {activeItem["имя"] && <Button className={styles.buttonEdit} onClick={openEditModal}>Редактировать</Button>}
          <Button type="default" onClick={() => setIsVisibleModalSaveFile(true)}>Сохранить</Button>
        </>}
      </div>
      <div className={styles.container}>
        <div>
          {file && file.data.map((item: Element, i: number) => {
            return <div key={i}>
              <div className={styles.elementName} onClick={(evt: any) => showItems(evt, item.characters)}>{item.position}<div className={styles.hidden}>{item.characters.map((item: any, i: number) => {
                keys = Object.keys(activeItem)
                values = Object.values(activeItem)
                return <div key={item["имя"]} style={item["имя"] === activeItem["имя"] ? { 'borderBottom': '1px solid black' } : { 'border': 'none' }} onClick={() => showTableItem(item)}>{item["имя"]}</div>
              })}</div></div></div>
          })}
        </div>
        {activeItems && <div className={styles.tabs}><Tabs className={styles.tabs} defaultActiveKey="0">
          {keys.map((tab: string, i: number) => {
            return <TabPane className={styles.tab} tab={tab !== "id" && tab} key={i}>
              {Array.isArray(values[i]) ? values[i].map((value: Skill, key: number) => {

                return <div className={styles.wrap} key={key}>
                  <div className={styles.name}>{value.name}</div>
                  <div className={styles.about}>{value.about}</div>
                </div>
              }) : values[i]}
            </TabPane>
          })}
        </Tabs></div>
        }
      </div>
      <ModalSaveFile
        isVisible={isVisibleModalSaveFile}
        handleCancel={closeModal}
        handleSubmit={handleSaveFile}
        title="Укажите название сохраняемого файла"
        form={formSaveFile} />
      <ModalEditFile
        isVisible={isVisibleModalEditFile}
        handleCancel={closeModal}
        handleSubmit={handleEditFile}
        title="Редактирование блока"
        form={formEditFile} />
    </>
  );
}

export default connect((state: AppState) => {
  return {
    file: state.file
  };
})(Main);