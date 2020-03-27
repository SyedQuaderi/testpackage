import React, {useState, useEffect} from 'react';
import {PostAPI, CommentsAPI} from '../../Api/WebAPI';
import {Tabs, Tab} from 'react-bootstrap';
import {Container, Row, Col, Button} from 'react-bootstrap';
import SpatialNavigation, { Focusable, FocusableSection } from 'react-js-spatial-navigation';
import Navigation, {VerticalList, HorizontalList, Grid, Focusable} from 'react-key-navigation';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import './MenuBar.css';

const ManuNavigation = () => {

    const [posts, setPosts] = useState(() => {
        var data = [];
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                setPosts(response.data); setIsLoading(false); setIsError('');
            })
            .catch(error => {setIsLoading(true); setIsError('Something is wrong ....!');});
        return  data; 
    });
    const [generic, setgeneric] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState('');
    
    useEffect(() => {
        setIsLoading(true);
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {setPosts(response.data); setIsLoading(false); setIsError('')})
            .catch(error => {setIsLoading(true); setIsError('Something is wrong ....!');});
    }, [])

    const [comments, setComments] = useState([]);
    const [isLoadingC, setIsLoadingC] = useState(false);
    const [isErrorC, setIsErrorC] = useState('');
    const [activeFocus, setActiveFocus] = useState(null);

    useEffect(() => {
        setIsLoadingC(true);
        axios.get('https://jsonplaceholder.typicode.com/comments')
            .then(response => {setComments(response.data); setIsLoadingC(false); setIsErrorC('')})
            .catch(error => {setIsLoadingC(true); setIsErrorC('Something is wrong ....!');});
            setgeneric([...posts]);
            console.log("first render");
    }, [])


   function Posts() {
        setIsLoading(false);
        setgeneric( [...posts]);
        console.log("Posts",  [...posts]);
   }

   function Comments() {
        console.log("Comments", comments);
        setgeneric([...comments]);
    }

    function focus(post) {
        console.log('focus ' + post.id);   
        setActiveFocus(post.id);
        setgeneric([...posts]);
    }

    function removeFocus(post) {
        console.log('unFocus ' + post.id);   
        setActiveFocus(null);
        setgeneric([]);
    }

    return (
        <div>
            <Container>
                <Row>
                    
                    <Col lg={12}>
                    <Navigation >
                                 
                        <Focusable onFocus={Posts}>
                            <Button className="btn-primary">
                                Posts
                            </Button>
                        </Focusable>
                   
                        < br/>
                        <Focusable onFocus={Comments}>
                            <Button className="btn-primary">
                                Comments
                            </Button>
                        </Focusable>
                        
                    {
                        isLoading ? ((<Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>)) : (
                            generic.map(post =>  
                                                <Focusable  onFocus={() => focus(post)}  key={post.id} onBlur={() => removeFocus(post)}>
                                                <Button  className={activeFocus === post.id ? 'active' : null}>{post.title}{post.email}</Button><br/>
                                                </Focusable>
                                                ) 
                                )
                    }
                    </Navigation>
                   </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ManuNavigation

