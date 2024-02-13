import {useState, FC} from 'react'
import Lightbox, {SlideImage} from "yet-another-react-lightbox"
import Inline from "yet-another-react-lightbox/plugins/inline"

import styles from './light-box.module.sass'


export const LightBox:FC<Props> = ({
    slides,
    className
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [index, setIndex] = useState(0);


    const updateIndex = ({ index: current }: { index: number }) =>
    setIndex(current);

    return (
        <div className={className}>
            <Lightbox
                index={index}
                slides={slides}
                plugins={[Inline]}
                on={{
                    view: updateIndex,
                    click: () => setIsOpen(true),
                }}
                carousel={{
                    padding: 0,
                    spacing: 0,
                    imageFit: "cover",
                }}
                className={styles.lightBox}
            />

            <Lightbox
                open={isOpen}
                close={() => setIsOpen(false)}
                index={index}
                slides={slides}
                on={{ view: updateIndex }}
                animation={{ fade: 0 }}
                controller={{ closeOnPullDown: true, closeOnBackdropClick: true }}
            />
        </div>
    )
}

interface Props {
    slides: SlideImage[]
    className?: string
}