import Image from "next/image";
import profilePic from '../../../public/OlivWebN&B.png'
import styles from './profilinfo.module.scss'
export const ProfileInfos = () => {
    return (
        <div className={styles.container}>
            <p>Professionnel polyvalent, je combine une solide expertise en gestion de projets et en développement web, avec une expérience approfondie en programmation artistique. Fort de plusieurs années de pratique dans la conception et la mise en œuvre de solutions web innovantes, j’ai piloté des projets complexes de bout en bout, assurant la coordination d’équipes pluridisciplinaires et le respect des délais et des objectifs. Mon approche rigoureuse me permet de gérer efficacement les ressources et les budgets, tout en intégrant des outils de gestion modernes tels que Notion, AirTable, et Trello. En parallèle, ma sensibilité artistique me permet de concevoir et de programmer des projets culturels ambitieux, alliant créativité et impact social.</p>
            <Image src={profilePic} alt="Photo Olivier Pierre" height={250} width={250} className={"my-4"}/>
        </div>
    )
}