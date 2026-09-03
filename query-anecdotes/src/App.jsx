import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useAnecdotes } from './hooks/useAnecdotes'

const App = () => {
  const { data, isError, isPending, updateVote } = useAnecdotes()

  const handleVote = (anecdote) => {
    updateVote(anecdote)
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