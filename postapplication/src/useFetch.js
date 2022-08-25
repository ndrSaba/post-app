import { useEffect, useState } from "react"
import axios from 'axios'

export function useFetch(url, options = {
    method: 'GET',
    data: null,
    headers: {}
}) {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    const load = async () => {
        try {
            setError(false)
            setLoading(true)
            const response = await axios({
                url,
                data: options.data,
                method: options.method,
                headers: options.headers
            });
            const { data } = response;
            setData(data)
        } catch (err) {
            setError(err.message)
            setLoading(false)
        }
    }
    useEffect(() => {
        load()
    }, [])

    useEffect(() => {
        if (data) setLoading(false)
    }, [data])

    return {
        data,
        error,
        loading,
        reload: load
    }
}