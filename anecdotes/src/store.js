
import { create } from 'zustand'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = anecdote => ({
  content: anecdote,
  id: getId(),
  votes: 0
})

const sortByVotes = (a, b) => b.votes - a.votes

const useAnecdoteStore = create((set) => ({
  anecdotes: anecdotesAtStart.map(asObject).toSorted(sortByVotes),
  actions: {
    incrementVote: (id) => set(
      state => {
        const newArray = state.anecdotes.map(anec =>
          anec.id === id
            ? { ...anec, votes: anec.votes + 1 }
            : anec
        ).toSorted(sortByVotes)

        return { anecdotes: newArray }
      }
    ),

    addAnecdote: (anec) => set(
      state => {
        const newArray = [...state.anecdotes, { content: anec, id: getId(), votes: 0 }].toSorted(sortByVotes)
        return { anecdotes: newArray }
      }
    )
  },
}))

export const useAnecdotes = () => useAnecdoteStore((state) => state.anecdotes)
export const useAnecdotesActions = () => useAnecdoteStore(state => state.actions)
