import React from 'react'
import {observer} from 'mobx-react'
import {
    BrowserRouter as Router, 
    Switch, 
    Link,
    Route} from 'react-router-dom'

import {ThemeStore} from './stores'
import {ThemeContext} from './contexts'

@observer
export default class ThemeApp extends React.Component{
    constructor(props){
        super(props)
        this.themeStore = new ThemeStore()
    }
    render(){
        return(
            <ThemeContext.Provider value={this.themeStore}>
                <Router>
                    <Link to='/first'>First Button</Link>
                    <Link to='/second'>Second Button</Link>
                    <Switch>
                        <Route path='/first'>
                            <ThemeButton />
                        </Route>
                        <Route path='/second'>
                            <AnotherButton />
                        </Route>
                    </Switch>
                </Router>
            </ThemeContext.Provider>
        )
    }
}

const ThemeButton=observer(()=>{
    return<ToggleButton />
})

@observer
class ToggleButton extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            color:''
        }
        this.change = (e)=>{
            this.setState({color: e.target.value})
        }
        this.submit = (e)=>{
            this.context.changeBackground(this.state.color)
            e.preventDefault()
        }
    }

    render(){
        this.theme = this.context
        return(
            <div>
                <form onSubmit={this.submit}>
                    <label>
                        Input the color: 
                        <input type='text' value={this.state.color} onChange={this.change}/>
                    </label>
                    <input type='submit' value='submit'/>
                </form>
                {/* <button style={{background: this.theme.background}} onClick={()=>this.theme.changeBackground('red')}>Change Color</button> */}
                <button style={{background: this.theme.background}}>ThemedButton</button>
            </div>
        )
    }
}

ToggleButton.contextType = ThemeContext

@observer
class AnotherButton extends React.Component{
    render(){
        this.theme = this.context
        return <button style={{background:this.theme.background}}>Second</button>
    }
}
AnotherButton.contextType = ThemeContext


// for context example from React website  
//import React from 'react'
// import {ThemeContext, themes} from './theme-context'
// import ThemeTogglerButton from './theme-toggler-button'

// export default class ThemeApp extends React.Component{
//     constructor(props){
//         super(props)
//         this.toggleTheme = ()=>{
//             this.setState(
//                 state => ({
//                     theme:
//                     state.theme === themes.dark? themes.light : themes.dark
//                 })
//             )
//         }
//         this.state={
//             theme: themes.light,
//             toggleTheme: this.toggleTheme
//         }
//     }

//     render(){
//         return (
//             <div>
//                 <ThemeContext.Provider value={this.state}>
//                    <Content />
//                 </ThemeContext.Provider>
//             </div>
//         )
//     }
// }

// function Content(){
//     return (
//         <div>
//             <ThemeTogglerButton />
//         </div>
//     )
// }