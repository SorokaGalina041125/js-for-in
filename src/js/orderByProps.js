export default function orderByProps(obj, order = []) {
  const orderedResult = [];
  const restKeys = [];
  const orderSet = new Set(order);

  for (const prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      if (orderSet.has(prop)) {
        orderedResult.push({ key: prop, value: obj[prop] });
      } else {
        restKeys.push(prop);
      }
    }
  }

  orderedResult.sort((a, b) => order.indexOf(a.key) - order.indexOf(b.key));
  restKeys.sort((a, b) => (a > b ? 1 : -1));

  const restResult = restKeys.map((key) => ({ key, value: obj[key] }));

  return [...orderedResult, ...restResult];
}