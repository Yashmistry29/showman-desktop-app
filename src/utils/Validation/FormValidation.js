export function validateSignup(values) {
  let errors = {};

  //username Errors
  if (!values.username) {
    errors.username = "A username is required.";
  } else if (values.username.length < 2) {
    errors.username = "A username must be at least 2 characters.";
  }

  // email Errors
  if (!values.email) {
    errors.email = "Your email is required.";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Your email is invalid.";
  }

  // Password Errors
  if (!values.password) {
    errors.password = "A password is required.";
  } else if (values.password.length < 2) {
    errors.password = "Your password must be at least 2 characters.";
  }

  // Confirm Password Errors
  if (!values.confirmPassword) {
    errors.confirmPassword = "A password is required.";
  } else if (values.confirmPassword.length < 2) {
    errors.confirmPassword = "Your password must be at least 2 characters.";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords must match.";
  }
  return errors;
}

export function validateSignin(values) {
  let errors = {};

  //username Errors
  if (!values.username) {
    errors.username = "A username is required.";
  } else if (values.username.length < 2) {
    errors.username = "A username must be at least 4 characters.";
  }

  // Password Errors
  if (!values.password) {
    errors.password = "A password is required.";
  } else if (values.password.length < 2) {
    errors.password = "Your password must be at least 2 characters.";
  }

  return errors;
}

export function ValidateCustomer(values) {
  let errors = {};

  //name Errors
  if (!values.name) {
    errors.name = "A name is required";
  } else if (values.name.length < 4) {
    errors.name = "Name must be atleast 4 Characters.";
  }

  if (!values.address) {
    errors.address = "A Address is required";
  } else if (values.name.length < 4) {
    errors.address = "Address must be atleast 4 Characters.";
  }

  return errors
}

export function validatePantData(values) {
  let errors = {}
  if (!values.p_length || values.p_length === 0) {
    errors.p_length = "Measurement required"
  }

  if (!values.waist || values.waist === 0) {
    errors.waist = "Measurement required"
  }

  if (!values.jholo || values.jholo === 0) {
    errors.jholo = "Measurement required"
  }

  if (!values.seat || values.seat === 0) {
    errors.seat = "Measurement required"

  }

  if (!values.thighs || values.thighs === 0) {
    errors.thighs = "Measurement required"

  }

  if (!values.knee || values.knee === 0) {
    errors.knee = "Measurement required"

  }

  if (!values.bottom || values.bottom === 0) {
    errors.bottom = "Measurement required"

  }

  if (!values.back_pocket || values.back_pocket === 0) {
    errors.back_pocket = "Measurement required"

  }

  if (!values.chipti || values.chipti === 0) {
    errors.chipti = "Measurement required"

  }

  if (!values.pocket_type) {
    errors.pocket_type = "Measurement required"

  }

  if (!values.belt_type || values.belt_type === 0) {
    errors.belt_type = "Measurement required"
  }

  return errors
}

export function validateShirtData(values) {
  let errors = {}
  if (!values.s_length || values.s_length === 0) {
    errors.s_length = "Measurement required"
  }

  if (!values.shoulder || values.shoulder === 0) {
    errors.shoulder = "Measurement required"
  }

  if (!values.sleeve || values.sleeve === 0) {
    errors.sleeve = "Measurement required"
  }

  if (!values.cuff || values.cuff === 0) {
    errors.cuff = "Measurement required"

  }

  if (!values.chest || values.chest === 0) {
    errors.chest = "Measurement required"

  }

  if (!values.waist || values.waist === 0) {
    errors.waist = "Measurement required"

  }

  if (!values.seat || values.seat === 0) {
    errors.seat = "Measurement required"

  }

  if (!values.pocket || values.pocket === 0) {
    errors.pocket = "Measurement required"

  }

  if (!values.collar || values.collar === 0) {
    errors.collar = "Measurement required"

  }

  if (!values.strip || values.strip === 0) {
    errors.strip = "Measurement required"

  }

  if (!values.shirt_type || values.shirt_type === 0) {
    errors.shirt_type = "Measurement required"
  }

  return errors
}

export function validateDate(createdAt, returnDate) {
  let error = {};
  if (createdAt.toDateString() === returnDate.toDateString()) {
    error.date = "Select Return Date";
  }

  return error
}