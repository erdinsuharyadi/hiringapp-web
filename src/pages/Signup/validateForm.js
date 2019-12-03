function validateForm (form) {
  const errors = {};
  if (!form.email) {
    errors.email = 'Required';
  }
  if (!form.password) {
    errors.password = 'Required';
  }
  if (!form.confirmPassword) {
    errors.confirmPassword = 'Required';
  }
  if (form.password !== form.confirmPassword) {
    errors.confirmPassword = 'Password does not match';
  }
  if (!/^.+@.+\..+$/.test(form.email)) {
    errors.confirmPassword = 'Invalid email';
  }
  return errors;
}