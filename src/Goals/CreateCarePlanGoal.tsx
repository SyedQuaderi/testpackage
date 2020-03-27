import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Form, Button, ListGroup } from 'react-bootstrap';

function MyGoals(props) {
    const [posts, setPosts] = useState<Array<any>>([]);
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [isError, setIsError] = useState<string>();
    console.log("sdfsdfsd");

    useEffect(() => {
        setIsLoading(true);
        console.log("here 1");

        axios.get('https://localhost:44313/api/pes/careplan/goals/77732')
            .then(response => { console.log("data from API", response.data); setIsLoading(false); setPosts(response.data); setIsError(''); })
            .catch(error => { console.log("this is the error", error); setIsLoading(true); setIsError('Something has gone wrong...!'); });
    }, [])

    const onSubmit = () =>
    {
        var title = (document.getElementById("exampleForm.ControlInput1") as HTMLInputElement).value;
        var description = (document.getElementById("exampleForm.ControlTextarea1") as HTMLInputElement).value;

        const params = {
            Title: title,
            Description: description,
        
        }
        console.log("sdf");

        

        axios.post('https://localhost:44313/api/pes/careplan/goals/create/77732', params)
            .then(response => {
                console.log("data from API", response.data); setIsLoading(false);
                axios.get('https://localhost:44313/api/pes/careplan/goals/77732')
                    .then(response => { console.log("data from API", response.data); setIsLoading(false); setPosts(response.data); setIsError(''); })
                    .catch(error => { console.log("this is the error", error); setIsLoading(true); setIsError('Something has gone wrong...!'); });
                setIsError('');
            })
            .catch(error => { console.log("this is the error", error); setIsLoading(true); setIsError('Something has gone wrong...!'); });
        console.log("gfgdfgdf");
    }

    return (
        <div style={{ marginLeft: "10%", marginTop: "10%", width: "60%"}}>
            
            <Form>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows="3" />
                </Form.Group>           
            </Form>
            <Button onClick={onSubmit }> Submit</Button>
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
                        </div>)
                    }
                </div>
            </div>
        </div>
    )
}



export default MyGoals;