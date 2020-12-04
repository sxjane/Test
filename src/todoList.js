import {computed, observable, action} from 'mobx'

class TodoItemStore{
    @observable title=''
    @observable finished=false
    @action onChange(name){
        this.title = name
    } 
}

class TodoListStore{
    @observable todos=[]
    @computed get unfinishedTodoCount(){
        return this.todos.filter( item => !item.finished).length
    }
    @action push(todo){
        if(this.checkTodo(todo)){
            todo.key = Math.random()
            this.todos.push(todo)
        }
    }
    @action flip(todo){
        if(this.checkTodo(todo)){
            this.todo.finished = !this.todo.finished
        }
    }
    checkTodo(todo){
        return (todo instanceof TodoItemStore && Object.keys(todo).length === 0 && todo.constructor === Object)
    }
}

export {TodoListStore, TodoItemStore}