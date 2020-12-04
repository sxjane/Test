import React from 'react'
import {TodoListStore, TodoItemStore} from './todoList'

export const TodoListContext = React.createContext({
    todoListStore: new TodoListStore(),
    todoItemStore: new TodoItemStore()
})

