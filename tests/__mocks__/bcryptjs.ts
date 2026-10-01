async function hash(value: string, _salt: number): Promise<string> {
  return `hashed:${value}`;
}
async function compare(value: string, hashed: string): Promise<boolean> {
  return hashed === `hashed:${value}`;
}

export default { hash, compare };
export { hash, compare };
