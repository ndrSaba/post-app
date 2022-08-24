import { Link } from "react-router-dom"
import { useFetch } from "./useFetch"
import "./style/PostList.css"

export function PostList() {
    const { data, error, loading } = useFetch("https://jsonplaceholder.typicode.com/posts")

    return (
        <div className="PostList">
            {loading && <h3>Loading...</h3>}
            {error && <h3>è stato riscontrato un errore</h3>}
            {data && data.map((data => {
                return (

                    <ul>
                        <Link className="link" to={`/posts/${data.id}?uid=${data.userId}`}>
                            <li key={data.id}><div className="PostTitleRow">
                                <div className="PostNumber">POST n.{data.id}</div>
                                <div className="PostTitle">TITOLO: </div> {data.title}
                            </div>
                            </li>
                        </Link>
                    </ul>
                )
            }))}
        </div>
    )
}