"use client"
import { EducationSummary } from "@/lib/types/EducationsTypes";
import styles from './education.module.scss';


interface EducationsProps {
    educations: EducationSummary[];
}
export default function Education({ educations }: EducationsProps) {

    return (
      <div className={styles.container}>
          {
            educations.map((educ, key) => (
              <div key={educ.id}>
                <p>{educ.dates}</p>
                <h4>{educ.degree}</h4>
                <p className={'font-extralight'}>{educ.institution}</p>
                <p>{educ.details}</p>
              </div>
            ))
          }
      </div>
  )
}
