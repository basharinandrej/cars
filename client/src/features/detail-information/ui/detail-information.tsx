import {FC, useMemo} from 'react'
import { useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { Badge } from 'antd'

import {
    getInformationDetail, 
    getInformationAboutAuthor,
    getIsMyDetail
} from '../model/selectors'

import {fetchByIdDetail} from '../model/async-actions/fetch-by-id-detail'
import {deleteDetail} from '../model/async-actions/delete-by-id-detail'

import { 
    useAppDispatch, 
    mapBadge, 
    Button, 
    getIsMobile, 
    getIsTablet, 
    useMount, 
    APP_SERVER_URL 
} from '@shared'

import {LightBox} from '@entities'

//@ts-ignore
import StringMask from 'string-mask'


import styles from './detail-information.module.sass'


export const DetailInformation: FC<Props> = ({
    id
}) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();


    const isMobile = getIsMobile()
    const isTablet = getIsTablet()
    const isDesktop = !isMobile && !isTablet
    
    useMount(() => id && dispatch(fetchByIdDetail(id)))

    const detailInformation = useSelector(getInformationDetail)
    const informationAboutAuthor = useSelector(getInformationAboutAuthor)
    const isMyDetail = useSelector(getIsMyDetail)

    const textBadge = useMemo(() => mapBadge[detailInformation.wear]?.value, [detailInformation])
    const colorBadge = useMemo(() => mapBadge[detailInformation.wear]?.color, [detailInformation])

    const formatterPhoneNumber = new StringMask('0(000)000-00-00');
    const phoneNumberFormatted = formatterPhoneNumber.apply(informationAboutAuthor.phoneNumber); 

    const onClickDeleteHandler = () => {
        dispatch(deleteDetail(id))
        navigate(-1)
    }
    const renderSide = () => {
        return (
            <div className={styles.side}>
                <p className={styles.price}>{detailInformation.price}&nbsp;P</p>

                <div className={styles.buttonNumber}>
                    <Button 
                        text={phoneNumberFormatted}
                        size={isDesktop ? 'large' : null}
                    />
                </div>
                {isMyDetail && <div>
                    <Button 
                        onClick={onClickDeleteHandler}
                        text={'Удалить'}
                        danger
                    />
                </div>}
            </div>
        )
    }

    const slides = detailInformation.detailPhoto.map((photo) => {
        return {src: `${APP_SERVER_URL}/details/${photo.url}`} 
    })


    return (
        <div className={styles.wrapper}>
            <div className={styles.main}>
                <h1 className={styles.title}>{detailInformation.name}</h1>
                <p className={styles.vendorCode}>Артикул - {detailInformation.vendorCode}</p>
                <span className={styles.wear}>Cостояние -&nbsp;<Badge
                    color={colorBadge}
                    count={textBadge}
                /></span>

                <LightBox slides={slides} className={styles.carousel} />
                
                {(isMobile || isTablet) && renderSide()}
                <p>{detailInformation.description}</p>
            </div>

            {isDesktop && renderSide()}
        </div>
    )
}

interface Props {
    id: number
}