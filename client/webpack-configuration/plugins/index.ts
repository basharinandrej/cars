import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

import webpack, {WebpackPluginInstance} from 'webpack'


export const getPlugins = (title: string, pathToIndex: string): WebpackPluginInstance[] => {
    return [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
          title,
          template: pathToIndex
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        })
    ]
}