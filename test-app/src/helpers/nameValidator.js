export function nameValidator(name) {
  const regName = /^[a-zA-Z ]{2,30}$/;
  name = name.trim();
  if (!name) return "Name can't be empty.";
  if (!regName.test(name)) return "Name is invalid.";
  return "";
}
