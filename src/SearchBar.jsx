import React from 'react'
import './styles.css'

export default class SearchBar extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            inputText: ''
        }
    }

    handleChange(e){
        this.setState({inputText:e.target.value})
    }

    render(){
        return(
            <div className='outline blue' >
                <div>
                    <input className='inputText' type='search' value={this.state.inputText} onChange={this.handleChange.bind(this)}/>
                    <button onClick={()=>this.props.search(this.state.inputText)}>Search</button>
                </div>
                
                <div>
                    <input type='checkbox' onChange={this.props.checked}/>
                    <label>Only show products in stock</label>
                </div>
            </div>
        )
    }
}