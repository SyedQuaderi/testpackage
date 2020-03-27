import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import { number } from 'prop-types';

export const CarePlanGoals: React.FC = () => {

    interface IPost {        
        header: string,
        text: string
    };


    const [posts, setPosts] = useState<Array<any>>([]);
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [isError, setIsError] = useState<string>();

    useEffect(() => {
        setIsLoading(true);
        console.log("here 1");
        
        axios.get('https://localhost:44313/api/pes/careplangoals/3/77732')
            .then(response => { console.log("data from API", response.data); setIsLoading(false); setPosts(response.data); setIsError(''); })
            .catch(error => { console.log("this is the error", error); setIsLoading(true); setIsError('Something has gone wrong...!'); });
    }, [])

    return (
        <div>
            {isError}
            {
                isLoading ? (<Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>) :
                    <div>
                        {
                            posts.map(post => <div key={post.header}>
                                <h1>{post.header}</h1>
                                <p>{post.text}</p>
                            </div>)
                        }
                    </div>
            }

        </div>
    )
}


