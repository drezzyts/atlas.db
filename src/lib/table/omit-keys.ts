export default function omitKeys<T extends object>(data: T, keys: Array<keyof T>): Partial<Record<keyof T, any>> {
  const object = { ...data };

  keys.forEach((key, i) => {
    if(Object.keys(object).includes(key as string)){
      delete object[key]
    }
  });

  return object;
}