export function stringLiterals<T extends string>(...args: T[]): T[] { return args; }
export type ElementType<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<infer ElementType> ? ElementType : never;
