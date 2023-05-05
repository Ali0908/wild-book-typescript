import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Wilder, {IWilderProps} from './components/Wilders';
import AddWilder from './components/AddWilders';
import EditSkillForm, { IEditSkillFormProps } from './components/EditSkillForm';

interface ISkillFromDB {
    id: number;
    name: string;
}

interface IGradeFromDB {
    grade: number;
    skill: ISkillFromDB;
}

interface IWilderFromDB {
    id: number;
    name: string;
    city: string;
    grades: IGradeFromDB[];
}

const formatWildersFromDB = (wilders: IWilderFromDB[]): IWilderProps[] =>
wilders.map((wilder) => {
    return {
    id:wilder.id,
    name: wilder.name,
    city: wilder.city,
    skills: wilder.grades.map((grade) => {
        return { votes: grade.grade, title: grade.skill.name };
    }),
    };
});

function App() {
const [wilders, setWilders]= useState<IWilderProps[]>([]);


useEffect(() => {
const fetchData = async () => {
const wilders = await axios.get<IWilderFromDB[]>("http://localhost:5000/api/wilder");
console.log(wilders.data);
setWilders(formatWildersFromDB(wilders.data));
};

fetchData();
},[]);
return (
<div>
<header>
    <div className="container">
    <h1>Wilders Book</h1>
    </div>
</header>
<main className="container">
<AddWilder />
    <h2>Wilders</h2>
    <section className="card-row">
        {wilders.map((wilder, index, array) => (
            <Wilder id={wilder.id} key ={index} name ={wilder.name} city ={wilder.city} skills ={wilder.skills}/>
        )
        )}
    </section>
</main>
<footer>
    <div className="container">
    <p>&copy; 2022 Wild Code School</p>
    </div>
</footer>
</div>
);
}

export default App;
