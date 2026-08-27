import { create } from 'zustand'
import anecdoteService from './services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)
const sortByVotes = (a, b) => b.votes - a.votes

const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  filter: '',
  actions: {
    initialize: async () => {
      const anecdotes = await anecdoteService.getAll()
      set(() => ({ anecdotes: anecdotes }))
    },

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
    ),

    updateFilter: (newValue) => set(
      state => ({ filter: newValue })
    )
  },
}))

export const useAnecdotes = () => useAnecdoteStore((state) => state.anecdotes)
export const useFilter = () => useAnecdoteStore(state => state.filter)
export const useAnecdotesActions = () => useAnecdoteStore(state => state.actions)
