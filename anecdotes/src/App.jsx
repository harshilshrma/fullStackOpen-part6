import { useAnecdotes, useAnecdotesActions } from "./store"

const App = () => {
  const anecdotes = useAnecdotes()
  const { incrementVote, addAnecdote } = useAnecdotesActions() 
  
  const vote = (id) => {
    incrementVote(id)
  }

  const handleAddAnecdote = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    addAnecdote(content)
    e.target.reset()
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={handleAddAnecdote}>
        <div>
          <input data-testid="new" name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App
