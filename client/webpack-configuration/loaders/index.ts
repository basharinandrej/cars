import path from 'path'
import {RuleSetRule} from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

export const getLoaders = (isDev: boolean): RuleSetRule[] => {
  
    const tsLoader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    }
    
    const styleLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 
            'css-loader', 
            "sass-loader"
        ],
    }

    const babelLoader = {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader',
    }
      return [
        styleLoader,
        tsLoader,
        babelLoader
      ]
  }