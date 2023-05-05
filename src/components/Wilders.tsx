import avatar from "../assets/avatar.png";
import Skill, {ISkillProps} from"./Skill";

export interface IWilderProps {
    id:number;
    name: string;
    city: string;
    skills: ISkillProps[];
}
const Wilder = ({ name, city, skills }: IWilderProps & { skills: ISkillProps[] } ) => (
<article className="card">
    <img src={avatar} alt={`${name}Profile`} />
    <h3>{ name }</h3>
    <h4>{city}</h4>
    <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
    commodo consequat.
    </p>
    <h4>Wild Skills</h4>    
    <ul className="skills">
    {skills.map((skill) => (
            <Skill  title ={skill.title}  votes ={skill.votes}/>
        )
        )}
    </ul>
</article>
);

export default Wilder;