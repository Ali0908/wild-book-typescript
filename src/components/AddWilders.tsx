import axios from 'axios';
import { useState } from 'react';
import { IWilderProps } from './Wilders';

const AddWilder = () => {
    const [name, setName] = useState<IWilderProps["name"]>("");
    const [city, setCity] = useState<IWilderProps["city"]>("");
return (
<form className='forms'
    onSubmit={(e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/wilder", {name, city});
}}
>
    <label className='name'>Name:</label>
    <input 
    type="text"
    value={name}
    onChange={(e) => {
    setName(e.target.value);
    }}
    >
    </input>
    <br></br>
    <label className='city'>City:</label>
    <input
    type="text"
    value={city}
    onChange={(e) => {
    setCity(e.target.value);
    }}
    >
    </input>
    <button className='addWilder'>Add Wilder</button>

</form>
);
};
export default AddWilder;