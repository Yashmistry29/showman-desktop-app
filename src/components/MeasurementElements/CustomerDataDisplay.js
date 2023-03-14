import React from 'react'

function CustomerDataDisplay({ data }) {
	return (
		<div className='pt1'>
			<fieldset className='b--dashed b--black bw2'>
				<legend className='ph2 pr2 b'>Customer Details</legend>
				<pre>{`c_id\t\t: ${data.c_id === undefined ? "" : data.c_id}`}</pre>
				<pre>{`Name\t: ${data.name === undefined ? "" : data.name}`}</pre>
				<pre>{`Mobile\t: ${data.phone === undefined ? "" : data.phone}\t\tMobile 2: ${data.phone2 === undefined ? "" : data.phone2}`}</pre>
				<pre>{`Address\t: ${data.place === undefined ? "" : data.place}`}</pre>
			</fieldset>
		</div>
	)
}

export default CustomerDataDisplay