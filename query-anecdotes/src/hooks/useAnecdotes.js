import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAnecdotes, createAnecdote, updateVote } from "../requests";
import useAnecdotesContext from "./useAnecdotesContext";

export const useAnecdotes = () => {
    const queryClient = useQueryClient()
    const { showNotification } = useAnecdotesContext()

    const result = useQuery({
        queryKey: ['anecdotes'],
        queryFn: getAnecdotes,
        retry: 1,
        refetchOnWindowFocus: false
    })

    const newAnecdoteMutation = useMutation({
        mutationFn: createAnecdote,
        onSuccess: (newAnecdote) => {
            const anecdotes = queryClient.getQueryData(['anecdotes'])
            queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
        },
        onError: () => {
            showNotification('too short anecdote, must have length 5 or more')
        }
    })

    const updateVoteMutation = useMutation({
        mutationFn: updateVote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
        }
    })

    return {
        data: result.data,
        isError: result.isError,
        isPending: result.isPending,
        addAnecdote: (content) => newAnecdoteMutation.mutate({ content }),
        updateVote: (anec) => updateVoteMutation.mutate({ ...anec, votes: anec.votes + 1 })
    }
}