import React from 'react'

const ProductOrder = (props) => {
    let {itemOrder} = props;
  return (
    <tr>
        <td>{itemOrder.id}</td>
        <td>{itemOrder.orderDetail.map((item)=>{
            return ' | ' + item.name + ' | '
        })}</td>
        <td>{itemOrder.date}</td>
    </tr>
  )
}

export default ProductOrder

