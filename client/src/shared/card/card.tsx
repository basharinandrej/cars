import styles from './card.module.sass'
import Button from '../button/button'
import { TypeButton } from '../button/enums/enums'

const Card = () => {


    return <div className={styles.card}>
        <div className={styles.header}>
            <img className={styles.img} src="https://www.autoopt.ru/upload/iblock/881/podveska.jpg" alt="detail" />
        </div>
        <div className={styles.body}>
            <h2 className={styles.title}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, maxime?</h2>
            <p className={styles.description}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore magni mollitia quo accusamus numquam animi! Obcaecati aliquid dolores labore cumque sint vel consequatur cum non? Corporis deserunt a modi? Facilis.</p>

            {/* <p className={styles.wear}>Нужен ремонт</p> */}
            <div className={styles.wrapper}>
                <div className={styles.boxText}>
                    <p className={styles.price}>100 p</p>
                    <p className={styles.date}>01.02.2024</p>
                </div>

                <Button type={TypeButton.Secondary} text={'Подробнее'} />
            </div>
        </div>
    </div>
}


export default Card