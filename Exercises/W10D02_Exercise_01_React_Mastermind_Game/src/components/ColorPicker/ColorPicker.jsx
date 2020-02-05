import React from 'react';
import styles from './ColorPicker.module.css';

const ColorPicker = (props) => (
  <div>
    {props.colors.map(color =>
      <button key={color} className={styles.button} style={{borderColor: color}} />
    )}
  </div>
);

export default ColorPicker;
