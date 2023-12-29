import styles from './RadioList.module.scss';

const RadioItem = ({ children, value, name, checked, onChange }) => {
  return (
    <li className={styles.radio}>
      <input
        value={value}
        id={value}
        name={name}
        type="radio"
        onChange={onChange}
        checked={checked}
      />
      <label htmlFor={value}>{children}</label>
    </li>
  );
};
export default function RadioList(props) {
  const { list, state } = props;
  return (
    <ul className={styles.radioUl}>
      {list.map((item, index) => (
        <RadioItem
          key={index}
          value={item.value}
          checked={state === item.value}
          {...props}>
          {item.label}
        </RadioItem>
      ))}
    </ul>
  );
}
