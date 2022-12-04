export function passwordValidator(password) {
  // const re =
  // /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*\\.\\_\\-])(?=.{5,30})/;
  if (!password) return "Password can't be empty.";
  if (password.length < 6)
    return "Password must be at least 5 characters long.";
  if (password.length > 30)
    return "Password must be at least 5 characters long.";
  // if (!re.test(password)) return "Password is invalid. Ex: Abcd@123!";
  return "";
}
