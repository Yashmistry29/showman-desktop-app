import React, {
  useState,
  useEffect
} from "react";
import "../styles/login.scss";
import mainlogo from "../images/SM_Logo.png";
import { validateSignin } from "../utils/Validation/FormValidation";
import { LoginForm } from "../utils/Data/InitialValues";
import { sendRequest } from "../utils/Helpers/HelpersMethod";
import { CssChildTextField as CssTextField } from "../components/FormElements/TextfieldForm";
import { toast, ToastContainer } from 'react-toastify';
const electron = window.require("electron");

const Login = () => {

  const ipcRenderer = electron.ipcRenderer;
  const [data, setData] = useState(LoginForm);
  const [errors, setErrors] = useState({});
  const [keyPress, setKeyPress] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  const handleSubmit = (e) => {
    const validationErrors = validateSignin(data);
    const isValid = Object.keys(validationErrors).length === 0;
    // console.log(validationErrors, isValid);
    setErrors(validationErrors);
    if (isValid) {
      // console.log(data);
      sendRequest("/user/login", "POST", data)
        .then(res => {
          if (res.success) {
            ipcRenderer.send('Authenticated', true);
          } else {
            toast.error(res.message, {
              position: "bottom-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: false,
              theme: "colored",
            });
            ipcRenderer.send('Authenticated', false);
          }
        }).catch((err) => {
          console.log(err);
        });
    }
    else {
      console.log(errors);
    }
  };

  useEffect(() => {
    window.addEventListener('keypress', (e) => {
      setKeyPress(e.key);
    });
    if (keyPress === 'Enter') {
      handleSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyPress])

  return (
    <React.Fragment>
      <ToastContainer />
      <div className="pt5 flex-column w-70 items-center center">
        <div className="w-100 center tc mb3">
          <img src={mainlogo} alt="logo" className="w-100" />
        </div>
        <div className="w-100 lsv">
          <CssTextField
            name="username"
            label="Username"
            size="small"
            variant="outlined"
            margin="dense"
            autoFocus
            value={data.username}
            onChange={handleChange}
            {...(errors.username && { error: true, helperText: errors.username })}
            // focused
            InputProps={{ style: { fontSize: "90%" } }}
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
            InputProps={{ style: { fontSize: "90%" } }}
            InputLabelProps={{ style: { fontSize: "90%", color: "#000" } }}
            fullWidth
          />
        </div>
        <div className="flex justify-center mt2">
          <button
            className="link pointer tc bg-dark-blue shadow-3 white dim dib w4 pa2 br2"
            onClick={handleSubmit}
          >Login</button>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Login;


// <Form>
//   <TextFieldForm
//     name="username"
//     label="Username"
//     type="text"
//     variant="outlined"
//     focused
//     inputLabelProps={{ style: { color: "#ffffff" } }}
//   />
//   <button className="f6 link dim br3 ph3 pv2 mb2 dib white bg-dark-blue">Login</button>
// </Form>