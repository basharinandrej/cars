import path from 'path'

import {getAliases} from './webpack-configuration/alias'
import {getPlugins} from './webpack-configuration/plugins'
import {getDevServer} from './webpack-configuration/dev-server'
import {getLoaders} from './webpack-configuration/loaders'
import {Env} from './webpack-configuration/interfaces'



export default (env: Env) => {
    const PORT = env.port || '3001'
    const mode = env.mode || 'development'
    const isDev = mode === 'development'
    const pathSrc = path.resolve(__dirname, 'src')

    return {
        entry: './src/index.tsx',
        devtool: 'inline-source-map',
        mode,
        output: {
            filename: '[name].[contenthash:9].js',
            path: path.resolve(__dirname, 'dist'),
            clean: true,
            publicPath: '/',
        },
        devServer: getDevServer(PORT),
        plugins: getPlugins('Пипелац35', './public/index.html'),

        module: {
            rules: getLoaders(isDev)
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js', '.css'],
            alias: getAliases(pathSrc),
        },
    }
    
}
