import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { render, within, cleanup } from '@testing-library/react'
import useAnecdoteStore from './store'
import anecdoteService from './services/anecdotes'
import AnecdoteList from './components/AnecdoteList'

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

vi.mock('./services/anecdotes', () => ({
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

afterEach(() => {
    cleanup()
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

    it('AnecdoteList receives a properly filtered list of anecdotes', async () => {
        anecdoteService.getAll.mockResolvedValue(mockAnecdotesArray)
        await useAnecdoteStore.getState().actions.initialize()

        useAnecdoteStore.setState({ filter: 'power' })

        const { getAllByTestId } = render(<AnecdoteList />)
        const anecdotes = getAllByTestId('anecdote-container')

        expect(within(anecdotes[0]).getByText('Adding manpower to a late software project makes it later!'))
        expect(anecdotes.length).toBe(1)
    })

    it('voting increases the number of votes for an anecdote', async () => {
        anecdoteService.getAll.mockResolvedValue(mockAnecdotesArray)
        anecdoteService.updateVotes.mockResolvedValue({
            ...mockAnecdotesArray[1],
            votes: 7
        })
        
        await useAnecdoteStore.getState().actions.initialize()

        const { getAllByTestId } = render(<AnecdoteList />)
        const anecdotes = getAllByTestId('anecdote-container')
        
        expect(within(anecdotes[0]).getByText('has 6'))
        
        const anecVoteButton = within(anecdotes[0]).getByRole('button', { name: 'vote' })
        await anecVoteButton.click()
        
        await within(anecdotes[0]).findByText('has 7')
    })
})
