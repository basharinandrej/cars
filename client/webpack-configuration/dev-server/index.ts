import {Configuration as DevServerConfiguration} from 'webpack-dev-server'


export const getDevServer = (PORT: string): DevServerConfiguration => {
    return {
        port: PORT,
        open: true,
        static: './dist',
        hot: true,    
        historyApiFallback: true
    }
}