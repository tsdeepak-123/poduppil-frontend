const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

const fieldValidate = (fieldName, value) => {
  // Front-end validation
  if (fieldName === 'email') {
    if (!value || !value.match(emailRegex)) {
      return 'Please enter a valid email address.';
    }
  }

  if (fieldName === 'password') {
    if (!value || !value.match(passwordRegex)) {
      return 'Please enter a valid password';
    }
  }
};

export default fieldValidate;
