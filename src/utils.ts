export const isDate = (d: any) => d instanceof Date;
export const isEmpty = (o: any) => Object.keys(o).length === 0;
export const isObject = (o: any) => o != null && typeof o === "object";
// @ts-ignore
export const hasOwnProperty = (o: any, ...args: (string | number)[]) => Object.prototype.hasOwnProperty.call(o, ...args);
export const isEmptyObject = (o: any) => isObject(o) && isEmpty(o);
export const makeObjectWithoutPrototype = () => Object.create(null);
