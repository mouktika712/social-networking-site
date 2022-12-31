export * from './toast-options';
export * from './constants';

export const setItemInLocalStorage = (value, key) => {
  if (!key || !value) {
    console.error('Cannot store in Local Storage');
    return;
  }

  const valueToStore =
    typeof value !== 'string' ? JSON.stringify(value) : value;

  localStorage.setItem(key, valueToStore);
};

export const getItemFromLocalStorage = (key) => {
  if (!key) {
    console.error('Cannot get the value from Local Storage');
    return;
  }

  return localStorage.getItem(key);
};

export const removeItemFromLocalStorage = (key) => {
  if (!key) {
    console.error('Cannot get from Local Storage');
    return;
  }

  localStorage.removeItem(key);
};

export const getFromBody = (params) => {
  let formBody = [];

  for (let property in params) {
    let encodedKey = encodeURIComponent(property); // 'user name' => 'user%20name'
    let encodedValue = encodeURIComponent(params[property]); //'mouktika 123' => 'mouktika%20123'

    formBody.push(encodedKey + '=' + encodedValue);
  }

  return formBody.join('&'); //'username=mouktika&password=123123'
};
