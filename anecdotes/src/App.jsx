import { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import { useAnecdotesActions, useNotification } from './store'
import Notification from './components/Notification'

const App = () => {
  const { initialize } = useAnecdotesActions()
  const notification = useNotification()

  useEffect(() => {
    initialize()
  }, [initialize])

  return (
    <div>
      {notification && <Notification />}
      <Filter />
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
