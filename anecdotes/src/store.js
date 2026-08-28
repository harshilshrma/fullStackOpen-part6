import { create } from 'zustand'
import anecdoteService from './services/anecdotes'

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

    addAnecdote: async (anec) => {
      const newAnecdote = await anecdoteService.createNew(anec)
      set(state => ({ anecdotes: [...state.anecdotes, newAnecdote] }))
    },

    updateFilter: (newValue) => set(
      state => ({ filter: newValue })
    )
  },
}))

export const useAnecdotes = () => useAnecdoteStore((state) => state.anecdotes)
export const useFilter = () => useAnecdoteStore(state => state.filter)
export const useAnecdotesActions = () => useAnecdoteStore(state => state.actions)
