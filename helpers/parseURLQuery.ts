import qs from 'qs';

const parseURLQuery = (path: string, params: {}): any => {
  const oldQuery = path.split('?');
  let query = {};
  if (oldQuery) {
    query = {
      ...qs.parse(oldQuery[1]),
      ...params,
    };
  }
  return query;
};

export default parseURLQuery;
