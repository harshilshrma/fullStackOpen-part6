import { useAnecdotes } from '../hooks/useAnecdotes'
import useAnecdotesContext from '../hooks/useAnecdotesContext'

const AnecdoteForm = () => {
  const { addAnecdote } = useAnecdotes()
  const { showNotification } = useAnecdotesContext()

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.reset()
    addAnecdote(content)
    showNotification(`You added "${content}"`)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm