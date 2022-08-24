import { Link, useParams, useSearchParams } from "react-router-dom"
import { useFetch } from "./useFetch"
import './style/Post.css';

export function Post() {
    const { id } = useParams()
    const [searchParams] = useSearchParams()
    const { data: post, loading: loadingContent } = useFetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    const { data: reply, loading: replyLoading } = useFetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
    const { data: users, loading: usersLoading } = useFetch(`https://jsonplaceholder.typicode.com/users/${searchParams.get('uid')}`)

    return (
        <div className="Post">
            {loadingContent && <h3>Loading...</h3>}
            <div className="Title">
                {post &&
                    <div>
                        <h1>TITOLO: <span>{post.title}</span></h1>
                    </div>}
            </div>
            <div className="PostPrincipale">
                {post &&
                    <div>
                        <h1>POST PRINCIPALE:</h1>
                        <div className="PostContent">
                            <p>{post.body}</p>
                            {usersLoading && <h3>Loading...</h3>}
                            {users && <p><span>POSTATO DA:</span> {users.username}</p>}
                        </div>
                    </div>}
            </div>
            <h1>RISPOSTE</h1>
            {replyLoading && <h3>Loading...</h3>}
            {reply &&
                reply.map((reply => {
                    return (
                        <div key={reply.id}>
                            <ul className="Reply">
                                <li>
                                    <p><span>{reply.email} ha risposto:</span> {reply.body}</p>
                                </li>
                            </ul>
                        </div>)
                }))
            }
            {!reply && <h3>Nessuna risposta per ora</h3>}
        </div>
    )
}