export * from './toast-options';
export * from './constants';

export const getFromBody = (params) => {
  let formBody = [];

  for (let property in params) {
    let encodedKey = encodeURIComponent(property); // 'user name' => 'user%20name'
    let encodedValue = encodeURIComponent(params[property]); //'mouktika 123' => 'mouktika%20123'

    formBody.push(encodedKey + '=' + encodedValue);
  }

  return formBody.join('&'); //'username=mouktika&password=123123'
};
