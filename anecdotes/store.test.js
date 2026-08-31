import { beforeEach, describe, expect, it, vi } from 'vitest'
import useAnecdoteStore from './src/store'
import anecdoteService from './src/services/anecdotes'

vi.mock('./src/services/anecdotes', () => ({
    default: {
        getAll: vi.fn(),
        createNew: vi.fn(),
        updateVotes: vi.fn(),
        deleteAnecdote: vi.fn()
    }
}))

beforeEach(() => {
    useAnecdoteStore.setState({ anecdotes: [], filter: '' })
})

describe('Anecdote Store', () => {
    it('the state is initialized with the anecdotes returned by the backend', async () => {
        const mockAnecdotes = [{
            content: "Make it work, then make it fast",
            id: "5",
            votes: 0
        }]
        anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

        await useAnecdoteStore.getState().actions.initialize()
        expect(useAnecdoteStore.getState().anecdotes).toEqual(mockAnecdotes)
    })
})
