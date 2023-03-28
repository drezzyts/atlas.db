export default function pickKeys<T extends object>(data: T, keys: Array<keyof T>): Partial<Record<keyof T, any>> {
  const object = Object.create({});

  keys.forEach((key, i) => {
    if(Object.keys(data).includes(key as string)){
      object[key] = data[key]
    }
  });

  return object;
}