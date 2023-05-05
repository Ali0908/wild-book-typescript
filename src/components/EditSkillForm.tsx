import axios from 'axios';
import { useState, useEffect } from 'react';
import { IWilderProps } from './Wilders';

  export interface IEditSkillFormProps {
    wilder: IWilderProps;
    setWilder: React.Dispatch<React.SetStateAction<IWilderProps>>;
    }

    const EditSkillForm = ({ wilder, setWilder }: IEditSkillFormProps) => {
    const [wilders, setWilders]= useState<IWilderProps[]>([]);
    const [skills, setSkills] = useState([]);
    const [skillsChooses, setSkillsChooses] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
        const skillForm = await axios.get("http://localhost:5000/api/skill");
        console.log(skillForm.data);
        setSkills(skillForm.data);
        };
        fetchData();
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/skill`, {
        skills: skillsChooses,
        }).then(response => {
        setWilder({...wilder, skills: response.data})
        });
    };

    return (
        <form
        className='forms'
        onSubmit={handleSubmit}
        >
        <h3>Edit Skills of {wilder.name}</h3>
        <select
            disabled
            value={wilder.name}
        >
            <option value={wilder.name}>{wilder.name}</option>
        </select>
        <select
            onChange={(e) => {
            setSkillsChooses(
                Array.from(e.target.selectedOptions).map((el) => el.value) as string[]
            );
            }}
            defaultValue={wilder.skills.map(skill => skill.title)}
            multiple
        >
            {skills.map((skill: { id: number; name: string }) => (
            <option key={skill.id} value={skill.name}>
                {skill.name}
            </option>
            ))}
        </select>
        <button>Submit</button>
        </form>
    );
    };

export default EditSkillForm;
