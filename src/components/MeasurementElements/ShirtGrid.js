import React from 'react'
import { Grid, MenuItem } from '@mui/material';
import { Shirt_type, Pocket_Strip } from '../../utils/Data/InitialValues';
import { CssTextField } from '../FormElements/TextfieldForm';
import { Edit, Done } from '@mui/icons-material';

const ShirtGrid = ({ data, setData, checkedData, quantity, setQuantity, errors }) => {

	const [priceChange, setPriceChange] = React.useState(true);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setData({ ...data, [name]: value });
	}

	const handleSChange = (e) => {
		setQuantity((prev) => ({
			shirt: e.target.value,
			pant: prev.pant
		}));
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
						<pre className={checkedData.shirt ? 'black b' : 'dark-gray'}>Shirt Type </pre>
						<CssTextField
							disabled={checkedData.shirt ? false : true}
							select
							variant='outlined'
							name='shirt_type'
							className='w-50'
							onChange={handleSelect}
							value={data.shirt_type}
							{...(errors.shirt_type && { error: true, helperText: errors.shirt_type })}
							size="small"
						>
							{
								Shirt_type.map((type) => (
									<MenuItem key={type.value} value={type.value} sx={{
										"& li": {
											backgroundColor: "white",
										},
										"&:hover": {
											backgroundColor: "#9966cb",
										},
										"&.Mui-focusVisible": {
											backgroundColor: "#9966cb",
										}
									}}>
										{type.name}
									</MenuItem>
								))
							}
						</CssTextField>
					</div>
					<div className='flex justify-start items-center'>
						<pre className={checkedData.shirt ? 'black b' : 'dark-gray'} >Length     </pre>
						<CssTextField
							disabled={checkedData.shirt ? false : true}
							variant='outlined'
							name='s_length'
							className='w-50'
							onChange={handleChange}
							{...(errors.s_length && { error: true, helperText: errors.s_length })}
							value={data.s_length}
						/>
					</div>
					<div className='flex justify-start items-center'>
						<pre className={checkedData.shirt ? 'black b' : 'dark-gray'}>Shoulder   </pre>
						<CssTextField
							disabled={checkedData.shirt ? false : true}
							variant='outlined'
							name='shoulder'
							className='w-50'
							onChange={handleChange}
							{...(errors.shoulder && { error: true, helperText: errors.shoulder })}
							value={data.shoulder}
						/>
					</div>
					<div className='flex justify-start items-center'>
						<pre className={checkedData.shirt ? 'black b' : 'dark-gray'}>Sleeve     </pre>
						<CssTextField
							disabled={checkedData.shirt ? false : true}
							variant='outlined'
							name='sleeve'
							className='w-50'
							onChange={handleChange}
							{...(errors.sleeve && { error: true, helperText: errors.sleeve })}
							value={data.sleeve}
						/>
					</div>
					<div className='flex justify-start items-center'>
						<pre className={checkedData.shirt ? 'black b' : 'dark-gray'}>Cuff       </pre>
						<CssTextField
							disabled={checkedData.shirt ? false : true}
							variant='outlined'
							name='cuff'
							className='w-50'
							onChange={handleChange}
							{...(errors.cuff && { error: true, helperText: errors.cuff })}
							value={data.cuff}
						/>
					</div>
					<div className='flex justify-start items-center'>
						<pre className={checkedData.shirt ? 'black b' : 'dark-gray'}>Chest      </pre>
						<CssTextField
							disabled={checkedData.shirt ? false : true}
							variant='outlined'
							name='chest'
							className='w-50'
							onChange={handleChange}
							{...(errors.chest && { error: true, helperText: errors.chest })}
							value={data.chest}
						/>
					</div>
					<div className='flex justify-start items-center'>
						<pre className={checkedData.shirt ? 'black b' : 'dark-gray'}>Waist      </pre>
						<CssTextField
							disabled={checkedData.shirt ? false : true}
							variant='outlined'
							name='waist'
							className='w-50'
							onChange={handleChange}
							{...(errors.waist && { error: true, helperText: errors.waist })}
							value={data.waist}
						/>
					</div>
					<div className='flex justify-start items-center'>
						<pre className={checkedData.shirt ? 'black b' : 'dark-gray'}>Seat       </pre>
						<CssTextField
							disabled={checkedData.shirt ? false : true}
							variant='outlined'
							name='seat'
							className='w-50'
							onChange={handleChange}
							{...(errors.seat && { error: true, helperText: errors.seat })}
							value={data.seat}
						/>
					</div>
				</Grid>
				<Grid item xs={12} md={6}>
					<div className='flex justify-start items-center'>
						<pre className={checkedData.shirt ? 'black b' : 'dark-gray'}>Pocket      </pre>
						<CssTextField
							disabled={checkedData.shirt ? false : true}
							variant='outlined'
							name='pocket'
							className='w-50'
							onChange={handleChange}
							{...(errors.pocket && { error: true, helperText: errors.pocket })}
							value={data.pocket}
						/>
					</div>
					<div className='flex justify-start items-center'>
						<pre className={checkedData.shirt ? 'black b' : 'dark-gray'}>Collar      </pre>
						<CssTextField
							disabled={checkedData.shirt ? false : true}
							variant='outlined'
							name='collar'
							className='w-50'
							onChange={handleChange}
							{...(errors.collar && { error: true, helperText: errors.collar })}
							value={data.collar}
						/>
					</div>
					<div className='flex justify-start items-center'>
						<pre className={checkedData.shirt ? 'black b' : 'dark-gray'}>Strip       </pre>
						<CssTextField
							disabled={checkedData.shirt ? false : true}
							select
							variant='outlined'
							name='strip'
							className='w-50'
							onChange={handleSelect}
							value={data.strip}
							{...(errors.strip && { error: true, helperText: errors.strip })}
							size="small"
						>
							{
								Pocket_Strip.map((type) => (
									<MenuItem key={type.value} value={type.value} sx={{
										"& li": {
											backgroundColor: "white",
										},
										"&:hover": {
											backgroundColor: "#9966cb",
										},
										"&.Mui-focusVisible": {
											backgroundColor: "#9966cb",
										}
									}}>
										{type.name}
									</MenuItem>
								))
							}
						</CssTextField>
					</div>
					<div className='flex justify-start items-start'>
						<pre className={checkedData.shirt ? 'black b' : 'dark-gray'}>Description </pre>
						<CssTextField
							disabled={checkedData.shirt ? false : true}
							margin="dense"
							variant='outlined'
							name='description'
							className='w-50'
							onChange={handleChange}
							multiline
							rows={3}
							size='small'
							value={data.description}
						/>
					</div>
					<div className='flex justify-start items-center'>
						<pre className={checkedData.shirt ? 'black b' : 'dark-gray'}>Quantity    </pre>
						<CssTextField
							disabled={checkedData.shirt ? false : true}
							variant='outlined'
							name='quantity'
							type="number"
							className='w-50'
							value={quantity}
							onChange={handleSChange}
						/>
					</div>
					<div className='flex justify-start items-center'>
						<pre className={checkedData.shirt ? 'black b' : 'dark-gray'}>Price       </pre>
						{
							priceChange ?
								<p className={`${checkedData.shirt ? 'black' : 'dark-gray'} pr2`}>{data.price}&#8377;</p> :
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
										className={`${checkedData.shirt ? 'black link pointer' : 'dark-gray'} pa1`}
										fontSize="small"
										onClick={(e) => { setPriceChange(true) }}
									/>
								</div>
						}
						{
							checkedData.shirt ? <Edit
								className={`${checkedData.shirt ? 'black link pointer' : 'dark-gray'} ${priceChange ? "" : "hide"} pa1`}
								fontSize="small"
								onClick={(e) => { setPriceChange(false) }}
							/> : ""
						}
					</div>
				</Grid>
			</Grid>
		</React.Fragment >
	)
}

export default ShirtGrid