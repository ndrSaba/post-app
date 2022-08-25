import { Link } from "react-router-dom"
import { useFetch } from "./useFetch"
import "./style/PostList.css"
import { Loading } from "./Loading"
import { MyError } from "./MyError"

export function PostList() {
    const { data, error, loading } = useFetch("https://jsonplaceholder.typicode.com/post")

    if (loading) return <Loading/>

    if (error) return <MyError message={error}/>

    return (
        <div className="PostList">
                <ul>
                    {
                        data.map((data => {
                            return (
                                <Link key={`reply-${data.id}`} className="link" to={`/posts/${data.id}?uid=${data.userId}`}>
                                    <li>
                                        <div className="PostTitleRow">
                                            <div className="PostNumber">POST n.{data.id}</div>
                                            <div className="PostTitle">TITOLO: </div> {data.title}
                                        </div>
                                    </li>
                                </Link>
                            )
                        }))
                    }
                </ul>
        </div>
    )
}