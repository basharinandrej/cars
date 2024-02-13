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
            {
                loader: "css-loader",
                options: {
                    modules: {
                        localIdentName: isDev ? '[name]-[local]__[hash]' : '[hash:base64]',
                        auto: (resPath: string) => Boolean(resPath.includes('.module.')),
                    },
                },
            },
            "sass-loader"
        ],
    }

    const cssLoader = {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader", 
        ],
    }

    const babelLoader = {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader',
    }

    return [
        styleLoader,
        cssLoader,
        tsLoader,
        babelLoader
    ]
  }