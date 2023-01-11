import APP_CONFIG from './app-config';
import type { ISearchResultItem } from './type';

const BASE_URL = APP_CONFIG.BASE_URL;

export const getSearchResults = async (
  query: string
): Promise<ISearchResultItem[]> => {
  const data = await (
    await fetch(`${BASE_URL}?q=${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': 'Content-Type, Accept',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE',
      },
    })
  ).json();
  console.info('calling api!', query, data);
  return data;
};
