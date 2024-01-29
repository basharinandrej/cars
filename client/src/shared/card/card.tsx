import {FC} from 'react'
import Button from '../button/button'
import { TypeButton } from '../button/enums/enums'
import Tag from '../tag/tag'
import { SizeTag } from '../tag/enums/enums'
import {StateTagWear} from './types/types'
import {mapTextTag} from './utils/get-map-text-tag'
import {TypeCard} from './enums/enums'
import {getClassNameTypeCard} from './utils/get-class-name-type-card'
import classNames from 'classnames'

import styles from './card.module.sass'


const Card: FC<Props> = ({
    stateTag,
    typeCard
}) => {

    return <div className={classNames(styles.card, getClassNameTypeCard(typeCard))}>
        <div className={styles.header}>
            <img className={styles.img} src="https://www.autoopt.ru/upload/iblock/881/podveska.jpg" alt="detail" />
            <Tag 
                className={styles.tag}
                text={mapTextTag[stateTag]} 
                state={stateTag}
                size={SizeTag.Large} 
            />
        </div>
        <div className={styles.body}>
            <h2 className={styles.title}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, maxime?</h2>
            <p className={styles.description}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore magni mollitia quo accusamus numquam animi! Obcaecati aliquid dolores labore cumque sint vel consequatur cum non? Corporis deserunt a modi? Facilis.</p>

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

interface Props {
    stateTag: StateTagWear
    typeCard: TypeCard
}

export default Card