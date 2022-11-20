export function nameValidator(name) {
  const regName = /^[a-zA-Z ]{2,30}$/;
  name = name.trim();
  if (!name) return "Name can't be empty.";
  if (name.length > 50) return "Maximum name is 30 characters.";
  if (name.length < 2) return "Minimum name is 2 characters.";
  if (!regName.test(name)) return "Name is invalid. Ex: Abc Xyz";
  return "";
}
