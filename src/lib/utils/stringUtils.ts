export function endsWithAny(checkString: string, endsWith: string[]): boolean {
  return endsWith.some((ext) => checkString.toLowerCase().endsWith(ext));
}