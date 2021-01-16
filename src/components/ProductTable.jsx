import { isArrayLike } from 'mobx'
import React from 'react'
import './styles.css'
import ProductRow from './ProductRow'
import ProductCategoryRow from './ProductCategoryRow'

export default class ProductTable extends React.Component{

    getProductsDOM(){
        let products = this.props.serverData
        let filterText = this.props.searchText
        let display_data = {
        }

        if(!products){
            return null
        }

        if(filterText){
            products = products.filter(item => item.category === filterText)
        }

        if(this.props.checked){
            products = products.filter(item => item.stocked)
        }


        for(let i=0; i< products.length; i++){
            let category = products[i].category 
            let picked = (({price,stocked,name})=>({price, stocked, name}))(products[i])
           
            if(!display_data.hasOwnProperty(category)){
                display_data[category] = []
            }
            display_data[category].push(picked)
        }

        let display_categories = Object.keys(display_data)
        let display_dom = [] 

        for(let item of display_categories){
            display_dom.push(
                <ProductCategoryRow category={item} key={Math.random()}/>
            )
            let rows = display_data[item].map((item)=>{
                return <ProductRow name={item.name} price={item.price} key={Math.random()}/>
            })
            display_dom = display_dom.concat(rows)
        }
        return display_dom
    }

    render(){
        return(
            <div className='outline green'>
                <div className='namePrice'>
                    <p>Name</p>
                    <p>Price</p>
                </div>
                {this.getProductsDOM()}
            </div>
        )
    }
}