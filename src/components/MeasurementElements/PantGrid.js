import React from 'react'
import { Grid, MenuItem } from '@mui/material';
import { Pocket_Type, belt_type } from '../../utils/Data/InitialValues';
import { CssTextField } from '../FormElements/TextfieldForm';
import { Edit, Done } from '@mui/icons-material';

const PantGrid = ({ data, setData, checkedData, quantity, setQuantity, errors }) => {

  const [priceChange, setPriceChange] = React.useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  const handlePChange = (e) => {
    setQuantity(e.target.value)
  }

  const handleSelect = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value })
  }

  return (
    <React.Fragment>
      <Grid container direction="row" alignItems="flex-start" justify="space-between" spacing={3}>
        <Grid item xs={12} md={6}>
          <div className='flex justify-start items-center'>
            <pre className={checkedData.pant ? 'black b' : 'dark-gray'}>Belt   </pre>
            <CssTextField
              disabled={checkedData.pant ? false : true}
              select
              variant='outlined'
              name='belt_type'
              className='w-50'
              size='small'
              onChange={handleSelect}
              value={data.belt_type}
              {...(errors.belt_type && { error: true, helperText: errors.belt_type })}
            >
              {
                belt_type.map((type) => (
                  <MenuItem key={type.value} value={type.value}>
                    {type.name}
                  </MenuItem>
                ))
              }
            </CssTextField>
          </div>
          <div className='flex justify-start items-center'>
            <pre className={checkedData.pant ? 'black b' : 'dark-gray'}>Length </pre>
            <CssTextField
              disabled={checkedData.pant ? false : true}
              variant='outlined'
              name='p_length'
              className='w-50'
              onChange={handleChange}
              value={data.p_length}
              {...(errors.p_length && { error: true, helperText: errors.p_length })}
            />
          </div>
          <div className='flex justify-start items-center'>
            <pre className={checkedData.pant ? 'black b' : 'dark-gray'}>Waist  </pre>
            <CssTextField
              disabled={checkedData.pant ? false : true}
              variant='outlined'
              name='waist'
              className='w-50'
              onChange={handleChange}
              value={data.waist}
              {...(errors.waist && { error: true, helperText: errors.waist })}
            />
          </div>
          <div className='flex justify-start items-center'>
            <pre className={checkedData.pant ? 'black b' : 'dark-gray'}>Jholo  </pre>
            <CssTextField
              disabled={checkedData.pant ? false : true}
              variant='outlined'
              name='jholo'
              className='w-50'
              onChange={handleChange}
              value={data.jholo}
              {...(errors.jholo && { error: true, helperText: errors.jholo })}
            />
          </div>
          <div className='flex justify-start items-center'>
            <pre className={checkedData.pant ? 'black b' : 'dark-gray'}>Seat   </pre>
            <CssTextField
              disabled={checkedData.pant ? false : true}
              variant='outlined'
              name='seat'
              className='w-50'
              onChange={handleChange}
              value={data.seat}
              {...(errors.seat && { error: true, helperText: errors.seat })}
            />
          </div>
          <div className='flex justify-start items-center'>
            <pre className={checkedData.pant ? 'black b' : 'dark-gray'}>Thighs </pre>
            <CssTextField
              disabled={checkedData.pant ? false : true}
              variant='outlined'
              name='thighs'
              className='w-50'
              onChange={handleChange}
              value={data.thighs}
              {...(errors.thighs && { error: true, helperText: errors.thighs })}
            />
          </div>
          <div className='flex justify-start items-center'>
            <pre className={checkedData.pant ? 'black b' : 'dark-gray'}>Knee   </pre>
            <CssTextField
              disabled={checkedData.pant ? false : true}
              variant='outlined'
              name='knee'
              className='w-50'
              onChange={handleChange}
              value={data.knee}
              {...(errors.knee && { error: true, helperText: errors.knee })}
            />
          </div>
          <div className='flex justify-start items-center'>
            <pre className={checkedData.pant ? 'black b' : 'dark-gray'}>Bottom </pre>
            <CssTextField
              disabled={checkedData.pant ? false : true}
              variant='outlined'
              name='bottom'
              className='w-50'
              onChange={handleChange}
              value={data.bottom}
              {...(errors.bottom && { error: true, helperText: errors.bottom })}
            />
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className='flex justify-start items-center'>
            <pre className={checkedData.pant ? 'black b' : 'dark-gray'}>Pocket      </pre>
            <CssTextField
              disabled={checkedData.pant ? false : true}
              select
              variant='outlined'
              name='pocket_type'
              className='w-50'
              onChange={handleSelect}
              size="small"
              value={data.pocket_type}
              {...(errors.pocket_type && { error: true, helperText: errors.pocket_type })}
            >
              {
                Pocket_Type.map((type) => (
                  <MenuItem key={type.value} value={type.value}>
                    {type.name}
                  </MenuItem>
                ))
              }
            </CssTextField>
          </div>
          <div className='flex justify-start items-center'>
            <pre className={checkedData.pant ? 'black b' : 'dark-gray'}>Chipti      </pre>
            <CssTextField
              disabled={checkedData.pant ? false : true}
              variant='outlined'
              name='chipti'
              className='w-50'
              onChange={handleChange}
              value={data.chipti}
              {...(errors.chipti && { error: true, helperText: errors.chipti })}
            />
          </div>
          <div className='flex justify-start items-center'>
            <pre className={checkedData.pant ? 'black b' : 'dark-gray'}>Back-Pocket </pre>
            <CssTextField
              disabled={checkedData.pant ? false : true}
              variant='outlined'
              name='back_pocket'
              className='w-50'
              onChange={handleChange}
              value={data.back_pocket}
              {...(errors.back_pocket && { error: true, helperText: errors.back_pocket })}
            />
          </div>
          <div className='flex justify-start items-start'>
            <pre className={checkedData.pant ? 'black b' : 'dark-gray'}>Description </pre>
            <CssTextField
              disabled={checkedData.pant ? false : true}
              margin='dense'
              variant='outlined'
              name='description'
              className='w-50'
              onChange={handleChange}
              value={data.description}
              multiline
              size='small'
              rows="3"
            />
          </div>
          <div className='flex justify-start items-center'>
            <pre className={checkedData.pant ? 'black b' : 'dark-gray'}>Quantity    </pre>
            <CssTextField
              disabled={checkedData.pant ? false : true}
              variant='outlined'
              name='quantity'
              type="number"
              className='w-50'
              value={quantity}
              onChange={handlePChange}
            />
          </div>
          <div className='flex justify-start items-center'>
            <pre className={checkedData.pant ? 'black b' : 'dark-gray'}>Price       </pre>
            {
              priceChange ?
                <p className={`${checkedData.pant ? 'black' : 'dark-gray'} pr2`}>{data.price}&#8377;</p> :
                <div>
                  <CssTextField
                    disabled={priceChange ? true : false}
                    variant='outlined'
                    name='price'
                    className='w-50'
                    defaultValue={data.price}
                    value={data.price}
                    onChange={handleChange}
                  />
                  <Done
                    className={`${checkedData.pant ? 'black link pointer' : 'dark-gray'} pa1`}
                    fontSize="small"
                    onClick={(e) => { setPriceChange(true) }}
                  />
                </div>
            }
            {
              checkedData.pant ? <Edit
                className={`${checkedData.pant ? 'black link pointer' : 'dark-gray'} ${priceChange ? "" : "hide"} pa1`}
                fontSize="small"
                onClick={(e) => { setPriceChange(false) }}
              /> : ""
            }
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default PantGrid