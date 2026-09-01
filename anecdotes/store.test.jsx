import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, within } from '@testing-library/react'
import useAnecdoteStore from './src/store'
import anecdoteService from './src/services/anecdotes'
import AnecdoteList from './src/components/AnecdoteList'

const mockAnecdotesArray = [
    {
        content: "If it hurts, do it more often",
        id: "47145",
        votes: 3
    },
    {
        content: "Adding manpower to a late software project makes it later!",
        id: "21149",
        votes: 6
    },
    {
        content: "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
        id: "69581",
        votes: 2
    },
]

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

describe('Store Tests', () => {
    it('the state is initialized with the anecdotes returned by the backend', async () => {
        const mockAnecdotes = [mockAnecdotesArray[0]]
        anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

        await useAnecdoteStore.getState().actions.initialize()
        expect(useAnecdoteStore.getState().anecdotes).toEqual(mockAnecdotes)
    })
})

describe('Component Tests', () => {
    it('AnecdoteList receives the anecdotes from the store sorted by votes', async () => {
        anecdoteService.getAll.mockResolvedValue(mockAnecdotesArray)
        await useAnecdoteStore.getState().actions.initialize()
        
        const { getAllByTestId } = render(<AnecdoteList />)
        const anecdotes = getAllByTestId('anecdote-container')

        expect(within(anecdotes[0]).getByText('Adding manpower to a late software project makes it later!'))
        expect(within(anecdotes[1]).getByText('If it hurts, do it more often'))
        expect(within(anecdotes[2]).getByText('The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.'))
    })
})
