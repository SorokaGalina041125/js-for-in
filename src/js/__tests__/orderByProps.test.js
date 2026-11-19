import orderByProps from '../orderByProps';

describe('orderByProps', () => {
  test('should sort properties by given order first and then alphabetically', () => {
    const obj = {
      name: 'мечник',
      health: 10,
      level: 2,
      attack: 80,
      defence: 40,
    };

    const result = orderByProps(obj, ['name', 'level']);

    expect(result).toEqual([
      { key: 'name', value: 'мечник' },
      { key: 'level', value: 2 },
      { key: 'attack', value: 80 },
      { key: 'defence', value: 40 },
      { key: 'health', value: 10 },
    ]);
  });

  test('should ignore keys from order that do not exist in object', () => {
    const obj = { b: 2, a: 1 };
    const result = orderByProps(obj, ['missing', 'b']);

    expect(result).toEqual([
      { key: 'b', value: 2 },
      { key: 'a', value: 1 },
    ]);
  });

  test('should sort all keys alphabetically when order is empty or omitted', () => {
    const obj = { z: 1, a: 2, m: 3 };
    expect(orderByProps(obj)).toEqual([
      { key: 'a', value: 2 },
      { key: 'm', value: 3 },
      { key: 'z', value: 1 },
    ]);
  });

  test('should not include inherited properties from prototype', () => {
    const proto = { inherited: 'secret' };
    const obj = Object.create(proto);
    obj.name = 'воин';

    const result = orderByProps(obj, ['name']);

    expect(result).toEqual([{ key: 'name', value: 'воин' }]);
  });
});