import React from 'react'
import SearchBar from './SearchBar'
import ProductTable from './ProductTable'
import './styles.css'
import axios from 'axios'

export default class FilterableProductTable extends React.Component{
    constructor(props){
        super(props)
        this.state={
            searchText: '',
            isLoading: true,
            checked: false
        }
        this.serverData=null
    }

    componentDidMount(){
        axios.get('/products')
        .then((response)=>{
            this.serverData = response.data
            this.setState({isLoading:false})

        })
        .catch((error)=>{
            console.log(error)
        })
    }

    updateSearchText(text){
        this.setState({searchText:text})
    }

    checked(e){
        this.setState({checked: e.target.checked})
    }

    render(){
        return ( 
            !this.state.isLoading && 
            <div className='outline yellow'>
                <SearchBar search={this.updateSearchText.bind(this)} checked={this.checked.bind(this)}/>
                <ProductTable serverData={this.serverData} searchText={this.state.searchText} checked={this.state.checked}/>
            </div>
        )
    }
}