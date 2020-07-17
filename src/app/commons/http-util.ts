export const  adicionarQueryParams = (url: string, name: string, values: string[]): string  => {
  if(!values){
    return url;
  }

  url = url + '?';

  if (typeof values == 'string') {
    url += `${name}=${values}`
  } else {
    values.forEach(id => {
      url += `${name}=${id}&`
    });
  }
  return url.substring(0, url.length - 1);
}
