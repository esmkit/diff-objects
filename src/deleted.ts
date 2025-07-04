import { hasOwnProperty, isEmpty, isObject, makeObjectWithoutPrototype } from "./utils";

const deletedDiff = (lhs: any, rhs: any) => {
  if (lhs === rhs || !isObject(lhs) || !isObject(rhs)) return {};

  return Object.keys(lhs).reduce((acc, key) => {
    if (hasOwnProperty(rhs, key)) {
      const difference = deletedDiff(lhs[key], rhs[key]);

      if (isObject(difference) && isEmpty(difference)) return acc;

      acc[key] = difference;
      return acc;
    }

    acc[key] = undefined;
    return acc;
  }, makeObjectWithoutPrototype());
};

export default deletedDiff;
