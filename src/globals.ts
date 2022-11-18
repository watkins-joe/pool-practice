export function clearInput(inputStateFn: any, booleanStateFn: any) {
  inputStateFn("");
  booleanStateFn(false);
}
