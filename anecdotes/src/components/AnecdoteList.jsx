import { useAnecdotes, useAnecdotesActions, useFilter } from "../store"

const AnecdoteList = () => {
    const anecdotes = useAnecdotes()
    const filterValue = useFilter()
    const { incrementVote, deleteAnecdote } = useAnecdotesActions()

    const anecdotesArray = anecdotes
        .filter(anec => anec.content.includes(filterValue))
        .map((anecdote) => (
            <div data-testid="anecdote-container" key={anecdote.id}>
                <div>{anecdote.content}</div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => incrementVote(anecdote.id)}>vote</button>
                    {anecdote.votes === 0 && <button onClick={() => deleteAnecdote(anecdote)}>delete</button>}
                </div>
            </div>
        ))

    return (
        <div>
            {anecdotesArray}
        </div>
    )
}

export default AnecdoteList
