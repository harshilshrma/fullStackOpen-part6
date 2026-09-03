import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useAnecdotes } from './hooks/useAnecdotes'
import useAnecdotesContext from './hooks/useAnecdotesContext'

const App = () => {
  const { data, isError, isPending, updateVote } = useAnecdotes()
  const { showNotification } = useAnecdotesContext()

  const handleVote = (anecdote) => {
    updateVote(anecdote)
    showNotification(`You voted "${anecdote.content}"`)
  }

  if (isPending) {
    return (
      <div>Loading data...</div>
    )
  }

  if (isError) {
    return (
      <div>Anecdote service not available due to problems in server!</div>
    )
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {data.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App