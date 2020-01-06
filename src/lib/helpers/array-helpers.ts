export const bottom: <T>(a: T[]) => T = (array: any[]) => array[0];
export const top: <T>(a: T[]) => T = (array: any[]) => array[array.length - 1];