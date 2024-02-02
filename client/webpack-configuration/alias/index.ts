import path from 'path'


export const getAliases = (pathSrc: string) => {
    return {
        "@app": path.resolve(pathSrc, 'app/index'),
        "@pages": path.resolve(pathSrc, 'pages/index'),
        "@widgets": path.resolve(pathSrc, 'widgets/index'),
        "@shared": path.resolve(pathSrc, 'shared/index'),
        "@features": path.resolve(pathSrc, 'features/index'),
        "@entities": path.resolve(pathSrc, 'entities/index'),
    }
}