export const usernameValidator = value => {
  if (!value) return 'Please enter your username or email.';
  // else if (!/^(?=.{6,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/.test(value))
  // return 'Username must contain 6 to 20 characters. Only letter number and underscore are allowed.'
};

export const passwordValidator = value => {
  if (!value) return 'Please enter your password.';
  else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(value))
    return 'Password must contain minimum 6 characters, at least one letter and one number.';
};

export const confirmPasswordValidator = (value, password) => {
  if (!value) return 'Please retype your password.';
  else if (value !== password)
    return 'Your password and confirmation password do not match.';
};

export const emailValidator = value => {
  if (!value) return 'Please enter your email.';
  else if (
    !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      value.toLowerCase()
    )
  )
    return 'Please enter a valid email.';
};

export const firstNameValidator = value => {
  if (!value) return 'Please enter your firstname.';
};

export const lastNameValidator = value => {
  if (!value) return 'Please enter your lastname.';
};
