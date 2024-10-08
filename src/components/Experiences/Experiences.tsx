"use client"
import { ExperienceSummary } from '@/lib/types/ExperiencesTypes';
import Carousel from '@/components/Carousel/Carousel';
import styles from './experiences.module.scss';


interface ExperiencesProps {
    experiences: ExperienceSummary[];
}
export default function Experiences({ experiences }: ExperiencesProps) {
  const orderedExperiences = [...experiences].sort((a,b) => a.id - b.id)
    return (
      <div className={styles.container}>
        <Carousel>
          {
            orderedExperiences.map((exp, key) => (
              <div key={exp.id}>
                <div>
                  <h4>{exp.role}</h4>
                  <p>{exp.company} - {exp.city}</p>
                </div>
                <ul>
                  {exp.tasks.map((task, key) =>(
                    <li key={task}>/ {task} </li>
                  ))
                  }
                </ul>
              </div>
            ))
          }
        </Carousel>
      </div>
  )
}
