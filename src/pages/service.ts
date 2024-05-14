import { service } from '../utils';

export const query = async (dispatch: any) => {
  dispatch({ type: 'UPDATE', payload: { loading: true } });

  const data: any = await service({ url: '/article', method: 'GET' });

  dispatch({ type: 'UPDATE', payload: { loading: false, articles: data?.data || [] } });
};

export const del = async (id: string, dispatch: any) => {
  dispatch({ type: 'UPDATE', payload: { loading: true } });

  await service({ url: `/article/${id}`, method: 'DELETE' });

  dispatch({ type: 'UPDATE', payload: { loading: false, article: {} } });

  query(dispatch);
};

export const save = async (id: string, params: any, dispatch: any) => {
  dispatch({ type: 'UPDATE', payload: { loading: true } });

  await service({ url: `/article/${id}`, method: 'PATCH', data: params });
  const data = await service({ url: `/article/${id}`, method: 'GET' });

  dispatch({ type: 'UPDATE', payload: { loading: false, article: data.data || {} } });

  query(dispatch);
};

export const create = async (params: any, dispatch: any) => {
  dispatch({ type: 'UPDATE', payload: { loading: true } });

  await service({ url: '/article', method: 'POST', data: params });

  dispatch({ type: 'UPDATE', payload: { loading: false } });

  query(dispatch);
};
