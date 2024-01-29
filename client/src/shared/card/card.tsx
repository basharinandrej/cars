import {FC} from 'react'
import Button from '../button/button'
import { TypeButton } from '../button/enums/enums'
import Tag from '../tag/tag'
import { SizeTag, StateTag } from '../tag/enums/enums'
import {TypeCard, StateCard} from './enums/enums'
import {getClassNameTypeCard} from './utils/get-class-name-type-card'
import { getClassNameStateHeaderCard } from './utils/get-class-name-state-header-card'
import {getStateTag} from './utils/get-state-tag'
import classNames from 'classnames'

import styles from './card.module.sass'


const Card: FC<Props> = ({
    stateCard,
    typeCard,
    buttonText,
    mapWithTagText
}) => {
    const isGrid = typeCard === TypeCard.Grid
    const isRow = !isGrid


    const tagCardGrid = isGrid && mapWithTagText && (<Tag 
        className={styles.tagGrid}
        text={mapWithTagText[getStateTag(stateCard)]} 
        state={getStateTag(stateCard)}
        size={SizeTag.Large} 
    />)

    const tagCardRow = isRow && mapWithTagText && (<Tag 
        className={styles.tagRow}
        text={mapWithTagText[getStateTag(stateCard)]} 
        state={getStateTag(stateCard)}
        size={SizeTag.Large} 
    />)

    return <div className={classNames(
        styles.card, 
        getClassNameTypeCard(typeCard))
    }>
        <div className={classNames(
            styles.header, 
            getClassNameStateHeaderCard(stateCard))
        }>
            <img className={styles.img} src="https://www.autoopt.ru/upload/iblock/881/podveska.jpg" alt="detail" />
            {tagCardGrid}
        </div>

        <div className={styles.body}>
            {tagCardRow}
            <h2 className={styles.title}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, maxime?</h2>
            <div className={styles.boxText}>
                <p className={styles.description}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore magni mollitia quo accusamus numquam animi! Obcaecati aliquid dolores labore cumque sint vel consequatur cum non? Corporis deserunt a modi? Facilis.</p>
                <p className={styles.date}>01.02.2024</p>
            </div>


            <div className={styles.wrapper}>
                <strong className={styles.price}>100 p</strong>

                <Button type={TypeButton.Secondary} text={buttonText} />
            </div>
        </div>
    </div>
}

interface Props {
    stateCard: StateCard
    typeCard: TypeCard
    buttonText: string
    mapWithTagText?: Record<StateTag, string> 
}

export default Card