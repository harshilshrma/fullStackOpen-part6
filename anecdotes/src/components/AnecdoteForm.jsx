import { useAnecdotesActions } from "../store"

const AnecdoteForm = () => {
    const { addAnecdote } = useAnecdotesActions()

    const handleAddAnecdote = (e) => {
        e.preventDefault()
        const content = e.target.anecdote.value
        addAnecdote(content)
        e.target.reset()
    }

    return (
        <div>
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

export default AnecdoteForm
