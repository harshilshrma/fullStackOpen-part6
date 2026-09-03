const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
    const response = await fetch(baseUrl)
    if (!response.ok) {
        throw new Error('Failed to fetch anecdotes!')
    }
    return await response.json()
}

export const createAnecdote = async (anec) => {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(anec)
    }

    const response = await fetch(baseUrl, options)
    if (!response.ok) {
        throw new Error('Failed to create anecdote!')
    }

    return await response.json()
}

export const updateVote = async (updatedAnec) => {
    const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedAnec)
    }

    const response = await fetch(`${baseUrl}/${updatedAnec.id}`, options)
    if (!response.ok) {
        throw new Error('Failed to vote!')
    }

    return await response.json()
}
