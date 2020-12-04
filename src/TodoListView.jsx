import React from 'react'
import {observer} from 'mobx-react'
import {TodoListContext} from './todoContext'

@observer
export default class TodoListView extends React.Component{
    static contextType = TodoListContext
    render(){
        let myContext = this.context
        console.log(myContext.todoListStore)
        console.log(myContext.todoItemStore)
        return(
            <div>
                <form onSubmit={myContext.todoListStore.push(myContext.todoItemStore)}>
                    <label>
                        New Task: 
                        <input type='text' value={myContext.todoItemStore.title} onChange={(e)=> {
                            myContext.todoItemStore.onChange(e.target.value)
                        }}/>
                    </label>
                    <input type='submit' value='Add'/>
                </form>
                <ul>
                    {myContext.todoListStore.todos.map((todo) => (
                        <TodoView todo={todo} key={todo.key} />
                    ))}
                </ul>
                {/* Tasks left: {this.props.todoList.unfinishedTodoCount} */}
            </div>
        )
    }
}


const TodoView = observer(({todo}) => (
    <li>
        <input
            type='checkbox'
            checked={todo.finished}
            onClick={value.todoListStore.flip} 
        />
        {todo.title}
    </li>
) )

