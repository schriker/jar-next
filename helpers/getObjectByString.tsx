/*
  Link: https://stackoverflow.com/a/6491621/10147840
*/

const getObjectByString = (o: { [key: string]: any }, s: string) => {
  s = s.replace(/\[(\w+)\]/g, '.$1');
  s = s.replace(/^\./, '');
  var a = s.split('.');
  for (var i = 0, n = a.length; i < n; ++i) {
    var k = a[i];
    if (k in o) {
      o = o[k];
    } else {
      return;
    }
  }
  return o;
};

export default getObjectByString;
