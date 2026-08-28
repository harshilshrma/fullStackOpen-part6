import { create } from 'zustand'
import anecdoteService from './services/anecdotes'

const sortByVotes = (a, b) => b.votes - a.votes

let notificationTimeout
const useNotificationStore = create((set) => ({
  notification: '',
  actions: {
    setAndRemoveNotification: (notif) => {
      if (notificationTimeout) {
        clearTimeout(notificationTimeout)
      }

      set({ notification: notif })

      notificationTimeout = setTimeout(() => {
        set({ notification: '' })
      }, 5000)
    }
  }
}))
export const useNotification = () => useNotificationStore(state => state.notification)

const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  filter: '',
  actions: {
    initialize: async () => {
      const anecdotes = await anecdoteService.getAll()
      set(() => ({ anecdotes: anecdotes.toSorted(sortByVotes) }))
    },

    incrementVote: async (id) => {
      const { setAndRemoveNotification } = useNotificationStore.getState().actions

      const anecdote = useAnecdoteStore.getState().anecdotes.find(anec => anec.id === id)
      const updated = await anecdoteService.updateVotes(
        id, { ...anecdote, votes: anecdote.votes + 1 }
      )

      setAndRemoveNotification(`You voted ${anecdote.content}`)

      set(state => ({
        anecdotes: state.anecdotes.map(a => a.id === id ? updated : a).toSorted(sortByVotes)
      }))
    },

    addAnecdote: async (anec) => {
      const { setAndRemoveNotification } = useNotificationStore.getState().actions
      const newAnecdote = await anecdoteService.createNew(anec)

      setAndRemoveNotification(`You added ${newAnecdote.content}`)

      set(state => ({ anecdotes: [...state.anecdotes, newAnecdote] }))
    },

    updateFilter: (newValue) => set(
      state => ({ filter: newValue })
    ),

    deleteAnecdote: async (anec) => {
      const { setAndRemoveNotification } = useNotificationStore.getState().actions
      if (anec.votes === 0) {
        await anecdoteService.deleteAnecdote(anec.id)

        setAndRemoveNotification(`You deleted ${anec.content}`)
        set(state => ({ anecdotes: state.anecdotes.filter(a => a.id !== anec.id) }))
      }
    }
  },
}))

export const useAnecdotes = () => useAnecdoteStore((state) => state.anecdotes)
export const useFilter = () => useAnecdoteStore(state => state.filter)
export const useAnecdotesActions = () => useAnecdoteStore(state => state.actions)
