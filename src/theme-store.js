import {observable, action} from 'mobx'

export default class ThemeStore{
    @observable 
    background = 'yellow'

    @action 
    changeBackground(color){
        console.log('theme-store color:', color)
        this.background = color
    }
}