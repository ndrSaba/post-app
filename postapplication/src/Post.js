import { Link, useParams, useSearchParams } from "react-router-dom"
import { useFetch } from "./useFetch"
import './style/Post.css';
import { Loading } from "./Loading";
import { useEffect } from "react";
import { MyError } from "./MyError";

export function Post() {
    const { id } = useParams()
    const [searchParams] = useSearchParams()
    const { data: post, loading: loadingContent, error: postError} = useFetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    const { data: reply, loading: replyLoading, error: replyError } = useFetch(`https://jsonplaceholder.typicode.com/posts/${id}/commentss`)
    const { data: users, loading: usersLoading, error: usersError } = useFetch(`https://jsonplaceholder.typicode.com/users/${searchParams.get('uid')}`)
    
    if ((loadingContent || replyLoading || usersLoading)) return <Loading/>

    if ((postError || replyError || usersError)) return <MyError message={postError || replyError || usersError}/>

    else return (
        <div className="Post">
                    <>
                        <div className="Title">
                            <div>
                                <h1>TITOLO: <span>{post.title}</span></h1>
                            </div>
                        </div>
                        <div className="PostPrincipale">
                            <div>
                                <h1>POST PRINCIPALE:</h1>
                                <div className="PostContent">
                                    <p>{post.body}</p>
                                    <p><span>POSTATO DA:</span> {users.username}</p>
                                </div>
                            </div>
                        </div>
                        <h1>RISPOSTE</h1>
                        <div key={reply.id}>
                            <ul className="Reply">
                                {reply.map((reply => {
                                    return (
                                        <li>
                                            <p><span>{reply.email} ha risposto:</span> {reply.body}</p>
                                        </li>
                                    )
                                }))}
                            </ul>
                        </div>

                        {reply.length == 0 && <h3>Nessuna risposta per ora</h3>}
                    </>
        </div>
    )
}