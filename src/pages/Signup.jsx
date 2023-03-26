import React, {
  useState,
  // useEffect
} from "react";
import mainlogo from "../images/SM_Logo.png";
import { validateSignup } from "../utils/Validation/FormValidation";
import { SignupForm } from "../utils/Data/InitialValues";
import { sendRequest } from "../utils/Helpers/HelpersMethod";
import { toast, ToastContainer } from 'react-toastify';
import { CssTextField } from "../components/FormElements/TextfieldForm";

const Signup = () => {

  const [data, setData] = useState(SignupForm);
  const [errors, setErrors] = useState({});
  const resetData = SignupForm;

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateSignup(data);
    const isValid = Object.keys(validationErrors).length === 0;
    // console.log(validationErrors, isValid);
    setErrors(validationErrors);
    if (isValid) {
      console.log(data);
      sendRequest("/user/signup", "POST", data)
        .then(res => {
          if (res.success) {
            toast.success(res.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            handleReset();
          }
        }).catch((err) => {
          console.log(err);
        });
    }
    else {
      toast.error("Please check you Inputs");
    }
  };

  const handleReset = (e) => {
    setData(resetData);
  }

  const handleChange = (e) => {
    // e.persist();
    // console.log(e.target.value);
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <React.Fragment>
      <ToastContainer />
      <div className="flex items-center mt3">
        <div className="flex flex-column w-70 center tc pa3">
          <img src={mainlogo} alt="logo" className="w-100" />
          <p
            className='tc title-font'
            style={{ color: "rgb(124, 23, 23)" }}
          >Showman <span className="black">Tailors</span></p>
        </div>
        <div className="flex w-50 flex-column pa3 lsv">
          <CssTextField
            name="email"
            label="Email Id"
            size="small"
            variant="outlined"
            autoFocus
            margin="dense"
            value={data.email}
            onChange={handleChange}
            {...(errors.email && { error: true, helperText: errors.email })}
            // focused
            InputProps={{ style: { fontSize: "90%", color: "#000" } }}
            InputLabelProps={{ style: { fontSize: "90%", color: "#000" } }}
            fullWidth
          />
          <CssTextField
            name="username"
            label="Username"
            size="small"
            variant="outlined"
            margin="dense"
            value={data.username}
            onChange={handleChange}
            {...(errors.username && { error: true, helperText: errors.username })}
            // focused
            InputProps={{ style: { fontSize: "90%", color: "#000" } }}
            InputLabelProps={{ style: { fontSize: "90%", color: "#000" } }}
            fullWidth
          />
          <CssTextField
            name="password"
            label="Password"
            size="small"
            variant="outlined"
            type="password"
            margin="dense"
            value={data.password}
            onChange={handleChange}
            {...(errors.password && { error: true, helperText: errors.password })}
            // focused
            InputProps={{ style: { fontSize: "90%", color: "#000" } }}
            InputLabelProps={{ style: { fontSize: "90%", color: "#000" } }}
            fullWidth
          />
          <CssTextField
            name="confirmPassword"
            label="Confirm Password"
            size="small"
            variant="outlined"
            type="password"
            margin="dense"
            value={data.confirmPassword}
            onChange={handleChange}
            {...(errors.confirmPassword && { error: true, helperText: errors.confirmPassword })}
            // focused
            InputProps={{ style: { fontSize: "90%", color: "#000" } }}
            InputLabelProps={{ style: { fontSize: "90%", color: "#000" } }}
            fullWidth
          />
          <button
            className="center link mt2 pointer tc bg-dark-blue white dim dib w3 w5-l w4-m pa2 br2"
            onClick={handleSubmit}
          >Signup</button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Signup;