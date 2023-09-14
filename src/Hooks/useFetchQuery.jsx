import React from 'react'
import { useQuery } from 'react-query'
const useFetchQuery = (queryKey, queryFn, onSuccess, onError) => {
    return useQuery({
        queryKey: [queryKey],
        queryFn: queryFn,
        onSuccess,
        onError
    })
}

export default useFetchQuery
