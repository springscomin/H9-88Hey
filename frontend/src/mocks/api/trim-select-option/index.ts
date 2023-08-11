import { rest } from 'msw';

import { data } from './data';
import { API_Url } from '@/constants';

export const trimSelectOptionHandler = [
  rest.get(`${API_Url}/model/1/trim/2/select_option`, (_, res, ctx) => {
    return res(ctx.json({ status: 200, message: '', data: data }));
  }),
];
