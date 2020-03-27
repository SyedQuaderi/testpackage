import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';


export const PatientProfile: React.FC = () => {

    interface IPost {
        alertImages?: string;
        attendingNurse?: string;
        bed?: string;
        consultant?: string;
        edd?: Date;
        firstName?: string;
        profilePicture?: string;
        surname?: string;
        title?: string;        
    };

    const [posts, setPosts] = useState<IPost>({});
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [isError, setIsError] = useState<string>();
    const [sections, setSections] = useState<Array<any>>([]);

    useEffect(() => {
        setIsLoading(true);
        axios.get('https://localhost:44313/api/pes/253949')
            .then(response => {
                console.log("data from API", response.data);
                setIsLoading(false);
                setPosts(response.data.patientProfile);
                setSections(response.data.sections);
                setIsError('');
            })
            .catch(error => { console.log("this is the error", error); setIsLoading(true); setIsError('Something has gone wrong...!'); });

    }, [])

    return (
        <div>
            {isError}
            {
                isLoading ? (<Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>) :
                    (<div>
                        <h1> {posts.title} {posts.firstName} {posts.surname} </h1>
                        <h5> Bed: {posts.bed} </h5>
                        <h5> Consultant: {posts.consultant} </h5>
                        <h5> Attending Nurse: {posts.attendingNurse} </h5>
                        <h5> EDD: {posts.edd} </h5>
                        {         
                            <div>Sections
                            {
                                    sections.map((section, i) =>
                                    {
                                        return (
                                            <div key={i}>
                                                <table>
                                                    {section.items.map(function (item, i) {
                                                        return <div key={i}>
                                                            <h5>{item.header}</h5>
                                                            <span> Type: {item.type}</span>
                                                            <span>Value: {item.value}</span>
                                                            <p>Formatted Text: {item.formattedText}</p>
                                                            <p>Status: {item.status}</p>
                                                            <p>Status Type: {item.statusType}</p>
                                                            <p>CSS: {item.statusCss}</p>
                                                        </div>
                                                    })}
                                                </table>
                                            </div>
                                                
                                            );
                                    })
                                }
                            </div>
                        }       
                     </div>)
            }
        </div>
    );
}

