export const profilePrefix = 'poolPrac';

export function clearInput(
  inputStateFn: React.Dispatch<React.SetStateAction<string>>,
  booleanStateFn?: React.Dispatch<React.SetStateAction<boolean>>
) {
  inputStateFn('');
  if (booleanStateFn) booleanStateFn(false);
}
