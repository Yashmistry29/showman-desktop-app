import React, {
  useState,
  useEffect
} from "react";
import { CssTextField } from "../components/FormElements/TextfieldForm";
import { price as InitialValues } from "../utils/Data/InitialValues";
import { toast, ToastContainer } from 'react-toastify';
import { sendRequest } from "../utils/Helpers/HelpersMethod";
import '../styles/dashboard.scss';


function Price() {
  const [currentPrice, setCurrentPrice] = useState(InitialValues);
  const [newPrice, setNewPrice] = useState(InitialValues);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setNewPrice({ ...newPrice, [name]: value });
  }

  const handleSubmit = () => {
    sendRequest('/price/editprice', 'POST', newPrice)
      .then((res) => {
        if (res.success) {
          toast.success(res.message, {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            theme: "colored",
          });
        }
      })
  }

  useEffect(() => {
    sendRequest("/price/getprice", "POST")
      .then((res) => {
        const price = res.data;
        setCurrentPrice({ ...price });
        setNewPrice({ ...price });
      }).catch((err) => {
        console.log(err);
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log(currentPrice, newPrice)

  return (
    <React.Fragment>
      <ToastContainer />
      <div className="pa3 flex-column items-center center font">
        <fieldset className='b--dashed b--black'>
          <legend className='ph2 pr2 b'>Current Price</legend>
          <pre className='black pr2 pb2'>{`Pant Price : ${currentPrice.pant_price === undefined ? "" : currentPrice.pant_price}`}&#8377;</pre>
          <pre className='black pr2'>{`Shirt Price: ${currentPrice.shirt_price === undefined ? "" : currentPrice.shirt_price}`}&#8377;</pre>
        </fieldset>
        <br />
        <br />
        <br />
        <fieldset className='b--dashed b--black'>
          <legend className='ph2 pr2 b'>New Price</legend>
          <div className='flex justify-start items-center pb2'>
            <pre className='black pr2'>Pant Price  </pre>
            <CssTextField
              variant='outlined'
              name='pant_price'
              className='w-50'
              type="number"
              onChange={handleChange}
              value={newPrice.pant_price}
            />
          </div>
          <div className='flex justify-start items-center pb2'>
            <pre className='black pr2'>Shirt Price </pre>
            <CssTextField
              variant='outlined'
              name='shirt_price'
              className='w-50'
              type="number"
              onChange={handleChange}
              value={newPrice.shirt_price}
            />
          </div>
        </fieldset>
        <div className="flex justify-center pt2">
          <p
            // className="link pointer tc bg-dark-blue white dim dib w4 pa2 br2"
            className='button-border link pointer tc bg-dark-blue white b--black ba dim dib w4 pa2 br2'
            onClick={handleSubmit}
          >Submit</p>
        </div>
      </div>
    </React.Fragment >
  )
}

export default Price