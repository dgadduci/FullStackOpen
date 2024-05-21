const Filter = ({ label, value, handle }) => <div>{label}<input value={value} onChange={handle} /></div>
export default Filter;
