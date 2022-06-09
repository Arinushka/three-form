import 'antd/dist/antd.css'
import React from 'react';
import Main from '../main/Main';
import styles from './app.module.css'

const App: React.FC = (): JSX.Element => {


  return (
    <div className={styles.app}>
      <Main />
    </div>
  );
}

export default App;
