import { useEffect, useState } from 'react'

interface Todo {
  id: number
  text: string
  completed: boolean
}

export default function App() {
  const [todos, setTodos] = useState<Todo[]>(JSON.parse(localStorage.getItem('todos') as string) || [])
  const [inputText, setInputText] = useState('')

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value)
  }

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (inputText.trim() === '') return

    const newTodo: Todo = {
      id: Date.now(),
      text: inputText,
      completed: false,
    }

    setTodos([...todos, newTodo])
    setInputText('')
  }

  const handleToggleTodo = (id: number) => {
    setTodos(prevTodos =>
      prevTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed }
        }
        return todo
      })
    )
  }

  const handleDeleteTodo = (id: number) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id))
  }

  return (
    <div className='container mx-auto px-4 mt-8'>
      <h1 className='text-3xl font-semibold mb-4'>Todo App</h1>
      <form className='flex' onSubmit={handleAddTodo}>
        <input
          type='text'
          value={inputText}
          onChange={handleInputChange}
          placeholder='Enter a task'
          className='p-2 border border-gray-300 rounded-l w-full'
        />
        <button className='px-4 py-2 bg-blue-500 text-white rounded-r'>Add</button>
      </form>
      <ul className='mt-4 space-y-2'>
        {todos.map(todo => (
          <li
            key={todo.id}
            className={`flex items-center space-x-2 ${todo.completed ? 'line-through text-gray-500' : ''}`}
          >
            <input
              type='checkbox'
              checked={todo.completed}
              onChange={() => handleToggleTodo(todo.id)}
              className='form-checkbox h-4 w-4 text-blue-500'
            />
            <span>{todo.text}</span>
            <button onClick={() => handleDeleteTodo(todo.id)} className='px-2 py-1 bg-red-500 text-white rounded'>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
