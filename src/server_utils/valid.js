const valid = (name, mobile, email, password, cf_password) => {
  if (!name || !mobile || !email || !password) return "Please add all fields.";

  if (!validateEmail(email)) return "Invalid emails.";

  if (password.length < 8) return "Password must be at least 8 characters.";

  if (password !== cf_password) return "Confirm Password did not match.";
};

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export default valid;
