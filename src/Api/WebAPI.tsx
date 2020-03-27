import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import { number } from 'prop-types';

export const PostAPI: React.FC = (CardProps) => {

interface IPost {
    id: number;
    title: string;
};


const [posts, setPosts] = useState<Array<any>>([]);
const [isLoading, setIsLoading] = useState<Boolean>(false);
const [isError, setIsError] = useState<string>();

useEffect(() => {
    setIsLoading(true);
    axios.get('http://10.1.90.134:5433/api/pes/253949', {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        proxy: {
          host: '10.1.90.134',
          port: 5433
        }
        })
         .then(response => { setIsLoading(false);setPosts(response.data); setIsError('');})
         .catch(error =>{console.log(error); setIsLoading(true); setIsError('Something has gone wrong...!');});
}, [])

    return (
        <div>
            { isError }
            {
                isLoading ? (<Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>) :
             <div>
             {
                 posts.map(post => <div key={post.id}> 
                         <p>{post.title}</p>
                     </div>)
             }
            </div>
            }
           
        </div>
    )
}

export const CommentsAPI: React.FC = () => {

    const [comments, setComments] = useState<Array<any>>([]);
    const [isLoading, setIsLoading] = useState<Boolean>(false);

    useEffect(()=>{
        setIsLoading(true);
        axios.get('https://jsonplaceholder.typicode.com/comments')
            .then(response =>{setComments(response.data); setIsLoading(false); })
            .catch(error=> {console.log(error); setIsLoading(true);})
    },[]);

    return (
        <div>
            <p> New API call for Comments</p>
            {
                comments.map(comment => <p key={comment.id}>{comment.email}</p>)
            }
        </div>
    );
}


