import {useState, FC} from 'react'
import Lightbox, {SlideImage} from "yet-another-react-lightbox"
import Inline from "yet-another-react-lightbox/plugins/inline"



export const LightBox:FC<Props> = ({
    slides
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [index, setIndex] = useState(0);


    const updateIndex = ({ index: current }: { index: number }) =>
    setIndex(current);

    return (
        <>
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
                inline={{
                style: {
                    width: "100%",
                    maxWidth: "900px",
                    aspectRatio: "3 / 2",
                    margin: "0 auto",
                },
                }}
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
        </>
    )
}

interface Props {
    slides: SlideImage[]
}