declare module '*.svg' {
  // eslint-disable-next-line no-undef
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}
