import queryString from 'query-string';
import {ParsedUrl} from '../interfaces/parsed-url'



export const deleteOneQueryParam = (key: keyof ParsedUrl) => {
    const parsedUrl: ParsedUrl = queryString.parse(location.search);
    delete parsedUrl[key]

    const stringifuedUrl = queryString.stringify(parsedUrl)
    window.history.pushState(null, '', `?${stringifuedUrl}`)
}