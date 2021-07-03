import React, { useEffect } from 'react'
import TodoList from './Todo/TodoList'
import Context from './context'
import Loader from './Loader'
import Modal from './Modal/Modal'

const AddTodo = React.lazy(
  () => 
  new Promise(resolve => {
    setTimeout(() => {
      resolve(import('./Todo/AddTodo'))
    }, 3000)
  })
)

function App() {
const [todos, setTodos] = React.useState([
  //{id: 1, completed: false, title: 'Buy a car'},
  //{id: 2, completed: false, title: 'Buy a house'},
  //{id: 3, completed: false, title: 'Buy a chain'},
])
const [loading, setLoading] = React.useState(true)

useEffect(() => {
  fetch('https://jsonplaceholder.typicode.com/todos/?_limit=5')
  .then(response => response.json())
  .then(todos => {
    setTimeout(() => {
      setTodos(todos)
      setLoading(false)
    }, 3000)
  })
}, [])

function toggleTodo(id) {
  setTodos(todos.map(todo => {
    if (todo.id === id) {
      todo.completed = !todo.completed
    }
    return todo
    })
  )
  //console.log('todo id', id)
}

function removeTodo(id) {
  setTodos(todos.filter(todo => todo.id !== id))
}

function addTodo(title) {
  setTodos(todos.concat([{
    title,
    id: Date.now(),
    completed: false
  }]))
}

  return (
    <Context.Provider value={{removeTodo}}>
      <div className='wrapper'>
      <h1>Some aims:</h1>
      <Modal />

      <React.Suspense fallback={<p>Loading...</p>}>
        <AddTodo onCreate={addTodo}/>
      </React.Suspense>

      {loading && <Loader />}
      {todos.length ? (
      <TodoList todos={todos} onToggle={toggleTodo}/>
      ) : (
        loading ? null : <p>You've deleted all </p>
      )}
    </div>
    </Context.Provider>
  )  
}

export default App;
