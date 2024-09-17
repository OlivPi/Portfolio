import Image from "next/image";
import profilePic from '../../../public/OlivWebN&B.png'
import styles from './profilinfo.module.scss'
export const ProfileInfos = () => {
    return (
        <div className={styles.container}>
            <p className={'mb-2'}>Spécialisé en React et WordPress, je bénéficie d’une solide expérience dans la création et le déploiement de projets web complexes. Mon expertise en développement front-end s’accompagne d’une maîtrise de la gestion de projet, me permettant de piloter des initiatives de bout en bout. De la conception technique à la mise en œuvre opérationnelle, j’assure le bon déroulement des projets tout en garantissant des solutions performantes et adaptées aux besoins des clients.</p>
            <p>En parallèle, mon savoir-faire en programmation artistique et événementielle me permet de concevoir et coordonner des projets culturels ambitieux. Que ce soit pour la gestion d’événements ou la direction artistique, j’allie créativité et rigueur pour offrir des expériences engageantes et enrichissantes, tout en répondant aux attentes des partenaires et du public.</p>
            <Image src={profilePic} alt="Photo Olivier Pierre" height={250} width={250} className={"my-4"}/>
        </div>
    )
}