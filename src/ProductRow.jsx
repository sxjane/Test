import React from 'react'

export default class ProductRow extends React.Component{
    render(){
        const {name, price} = this.props 
        return (
            <div className='outline red'>
                <label>{name}</label>
                <label>{price}</label>
            </div>
        )
    }
}