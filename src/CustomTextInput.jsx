import React from 'react'

export default class CustomTextInput extends React.Component{
    constructor(props){
        super(props)
        this.textInput = React.createRef()
        this.focusTextInput = this.focusTextInput.bind(this)
    }

    focusTextInput(){
        console.log('inside:',this.textInput.current)
        this.textInput.current.focus()
    }

    render(){
        console.log(this.textInput.current)
        return (
            <div>
                <input type='text' ref={this.textInput}/>
                <input 
                type='button'
                value='Focus the text input'
                onClick={this.focusTextInput}/>
            </div>
        )
    }
}