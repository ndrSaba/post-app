import { useEffect, useState } from "react"
import axios from 'axios'

export function useFetch(url, options = {
    method: 'GET',
    data: null,
    headers: {}
}) {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

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
            setLoading(false)
        } catch (err) {
            setError(err.message)
            setLoading(false)
        }
    }
    useEffect(() => {
        load()
    }, [])

    return {
        data,
        error,
        loading,
        load
    }
}