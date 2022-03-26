import { snakeCase } from 'snake-case';

const toSnakeCase = (object) => {
  if (typeof object === 'string') {
    return snakeCase(object);
  }
  let snakeObject = {};
  for (const key in object) {
    snakeObject = {
      ...snakeObject,
      [snakeCase(key)]: object[key],
    };
  }
  return snakeObject;
};
export default toSnakeCase;
