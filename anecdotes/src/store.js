import { create } from 'zustand'
import anecdoteService from './services/anecdotes'

const sortByVotes = (a, b) => b.votes - a.votes

const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  filter: '',
  actions: {
    initialize: async () => {
      const anecdotes = await anecdoteService.getAll()
      set(() => ({ anecdotes: anecdotes.toSorted(sortByVotes) }))
    },

    incrementVote: async (id) => {
      const anecdote = useAnecdoteStore.getState().anecdotes.find(anec => anec.id === id)
      const updated = await anecdoteService.updateVotes(
        id, {...anecdote, votes: anecdote.votes + 1}
      )
      set(state => ({ 
        anecdotes: state.anecdotes.map(a => a.id === id ? updated : a).toSorted(sortByVotes)
      }))
    },

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
