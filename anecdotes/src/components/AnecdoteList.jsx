import { useAnecdotes, useAnecdotesActions, useFilter } from "../store"

const AnecdoteList = () => {
    const anecdotes = useAnecdotes()
    const filterValue = useFilter()
    const { incrementVote } = useAnecdotesActions()

    const vote = (id) => {
        incrementVote(id)
    }

    const anecdotesArray = anecdotes
        .filter(anec => anec.content.includes(filterValue))
        .map((anecdote) => (
            <div key={anecdote.id}>
                <div>{anecdote.content}</div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id)}>vote</button>
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
