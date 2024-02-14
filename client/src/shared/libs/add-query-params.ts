import queryString from 'query-string';
import {ParsedUrl} from '../interfaces/parsed-url'
import { StatusOrganization } from '../enums';

export const addQueryParams = (key: keyof ParsedUrl, value: string|number) => {
  if(!value) return
  const parsedUrl: ParsedUrl = queryString.parse(location.search);
  parsedUrl[key] = value.toString()

  const stringifuedUrl = queryString.stringify(parsedUrl)

  window.history.pushState(null, '', `?${stringifuedUrl}`)
}