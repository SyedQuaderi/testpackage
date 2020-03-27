import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Form, Button, ListGroup, ButtonGroup, ToggleButton } from 'react-bootstrap';

function MyGoals(props) {
    const [posts, setPosts] = useState<Array<any>>([]);
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [isError, setIsError] = useState<string>();
    console.log("sdfsdfsd");

    useEffect(() => {
        setIsLoading(true);
        console.log("here 1");

        axios.get('https://localhost:44313/api/pes/careplan/goal/77732')
            .then(response => { console.log("data from API", response.data); setIsLoading(false); setPosts(response.data); setIsError(''); })
            .catch(error => { console.log("this is the error", error); setIsLoading(true); setIsError('Something has gone wrong...!'); });
    }, [])

    const onSubmit = () =>
    {
        var IsCompleted = (document.getElementById("formBasicCheckbox") as HTMLInputElement).value;
        console.log("Iscompleted" + IsCompleted);
        //var description = (document.getElementById("exampleForm.ControlTextarea1") as HTMLInputElement).value;
        var value = false;

        if (IsCompleted == "on")
        {
            value = true;
        }
        const params = {
            IsCompleted: value
        }
        console.log("sdf");

        

        axios.post('https://localhost:44313/api/pes/careplan/goal/update/2443734', params)
            .then(response => {
                console.log("data from API", response.data); setIsLoading(false);
                axios.get('https://localhost:44313/api/pes/careplan/goal/77732')
                    .then(response => { console.log("data from API", response.data); setIsLoading(false); setPosts(response.data); setIsError(''); })
                    .catch(error => { console.log("this is the error", error); setIsLoading(true); setIsError('Something has gone wrong...!'); });
                setIsError('');
            })
            .catch(error => { console.log("this is the error", error); setIsLoading(true); setIsError('Something has gone wrong...!'); });
        console.log("gfgdfgdf");
    }

    return (
        <div style={{ marginLeft: "10%", marginTop: "10%", width: "60%"}}>
                        
            <div>
                <br />
                <br/>
                <ListGroup>
                    <ListGroup.Item>Cras justo odio</ListGroup.Item>
                </ListGroup>


                <div>
                    {
                        posts.map(post => <div key={post.header}>
                            <h1>{post.header}</h1>
                            <p>{post.text}</p> 
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Check me out" onClick={onSubmit} />
                                </Form.Group>
                            
                        </div>)
                    }
                </div>
            </div>
        </div>
    )
}



export default MyGoals;