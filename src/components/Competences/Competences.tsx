import {SkillsSummary} from '@/lib/types/SkillsTypes';
import styles from './skils.module.scss';
import { formatType } from '@/utils/formatLabelTypes';
interface SkillListProps {
  skill: SkillsSummary[];
  title: string;
}

export default function Skill({ skill, title }: SkillListProps) {
  const skillsByType = skill.reduce<Record<string, SkillsSummary[]>>((acc, skill) => {
    const formattedType = formatType(skill.type);
    if (!acc[formattedType]) {
      acc[formattedType] = [];
    }
    acc[formattedType].push(skill);
    return acc;
  }, {});
  return (
    <>
      {Object.entries(skillsByType).map(([type, skills]) => (
          <div className={styles.container} key={type}>
            <h4>{type}</h4>
            <ul>
              {skills.map((skill) => (
                  <li key={skill.id}>{skill.name} /</li>
              ))}
            </ul>
          </div>
      ))}
    </>
  )
}
