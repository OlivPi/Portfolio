import {SkillsSummary} from '@/lib/types/SkillsTypes'
import styles from './skils.module.scss';
interface SkillListProps {
  skill: SkillsSummary[];
}

export default function Skill({ skill }: SkillListProps) {
  const skillsByType = skill.reduce<Record<string, SkillsSummary[]>>((acc, skill) => {
    if (!acc[skill.type]) {
      acc[skill.type] = [];
    }
    acc[skill.type].push(skill);
    return acc;
  }, {});
  return (
    <div className={styles.container}>
      {Object.entries(skillsByType).map(([type, skills]) => (
          <div key={type}>
            <h3>{type}</h3>
            <ul>
              {skills.map((skill) => (
                  <li key={skill.id}>{skill.name}</li>
              ))}
            </ul>
          </div>
      ))}
    </div>
  )
}
