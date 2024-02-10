


export const setScrollToDocument = (scrollPosition: number) => {

    document.documentElement.scrollTo({
        top: scrollPosition,
        behavior: 'auto'
    })
}