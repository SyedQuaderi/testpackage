import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import { number } from 'prop-types';

export const CarePlanSections: React.FC = () => {

    interface IPost {
        carePlanId: number;
        carePlanSectionId: number,
        header: string,
        code: string,
        icon: string
    };

    const [posts, setPosts] = useState<Array<any>>([]);
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [isError, setIsError] = useState<string>();

    useEffect(() => {
        setIsLoading(true);
        console.log("here 1");
        console.log(process.env.CarePlan);
        axios.get('https://localhost:44313/api/pes/careplansections/77732')
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
                            posts.map(post => <div key={post.carePlanSectionId}>
                                <p>{post.header}</p>
                            </div>)
                        }
                    </div>
            }

        </div>
    )
}
