import { Tabs } from 'antd';
import 'antd/dist/antd.css'
import React, { useEffect, useState } from 'react';
import styles from './main.module.css'
import { characters } from '../../data';
import { Element, Skill, Character } from '../../types';


const Main: React.FC = (): JSX.Element => {

  const [isVisibleItems, setIsVisibleItems] = useState<boolean>(false);
  // const [isVisibleTableItem, setIsVisibleTableItem] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<any>({});
  const [activeItems, setActiveItems] = useState<any>([]);

  let keys: string[] = []
  let values: any;


  const showItems = (evt: any, items: any) => {
    setIsVisibleItems(!isVisibleItems);
    setActiveItems(items)
    Array.from(evt.target.children).map((item: any) => {
      if (item.className === `${styles.hidden}`) {
        item.className = styles.item
      } else {
        item.className = styles.hidden
      }
    })
  }




  useEffect(() => {
    if (activeItem.active) {
      activeItems.forEach((item: any) => {
        if (item["имя"] !== activeItem["имя"]) {
          // item.active = false
        }else{
          item.active = false
        }
      })
    }
  }, [ activeItem])



  const showTableItem = (item: any, evt: any) => {
    item.active = true
    // setIsVisibleTableItem(true)
    setActiveItem(item)
  }
  const { TabPane } = Tabs;

  return (
    <div className={styles.container}>
      <div>
        {characters.map((item: Element, i: number) => {
          return <div key={i}>
            <div className={styles.elementName} onClick={(evt: any) => showItems(evt, item.characters)}>{item.position}{item.characters.map((item: any) => {
              keys = Object.keys(activeItem)
              values = Object.values(activeItem)

              return <div key={item["имя"]} className={ styles.hidden} style={item.active ? {'border': '1px solid red'}:{'border': 'none'}} onClick={(evt) => showTableItem(item, evt)}>{item["имя"]}</div>

            })}</div></div>
        })}
      </div>
      {activeItems && <div className={styles.tabs}><Tabs defaultActiveKey="0">
          {keys.map((tab: string, i: number) => {
            return <TabPane className={styles.tab} tab={tab} key={i}>
              {Array.isArray(values[i]) ? values[i].map((value: any, key: number) => {
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
  );
}

export default Main;