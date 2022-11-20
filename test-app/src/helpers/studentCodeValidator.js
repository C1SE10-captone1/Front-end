export function studentCodeValidator(name) {
  const regName = /^[0-9]{10,11}$/;
  name = name.trim();
  if (!name) return "Student code can't be empty.";
  if (!regName.test(name))
    return "Student code is invalid. Ex: 25xxxxxxxx, 25xxxxxxxxx";
  return "";
}
