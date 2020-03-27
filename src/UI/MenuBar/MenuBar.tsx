import React, {useState, useEffect} from 'react';
import {PostAPI, CommentsAPI} from '../../Api/WebAPI';
import {Tabs, Tab} from 'react-bootstrap';
import {Button, Container, Row, Col} from 'react-bootstrap';
import SpatialNavigation, { Focusable, FocusableSection } from 'react-js-spatial-navigation';
//import Navigation, {VerticalList, HorizontalList, Grid, Focusable} from 'react-key-navigation';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import './MenuBar.scss';

const MenuBar = () => {

    const [posts, setPosts] = useState<Array<any>>(() => {
        return [];
    });
    const [generic, setgeneric] = useState<Array<any>>(() => {
        return [{id: 1, title: 'faisal'}];
    });
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [isError, setIsError] = useState<String>('');
    
    useEffect(() => {
        setIsLoading(true);
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                setgeneric(response.data);
                setPosts(response.data); setIsLoading(false); setIsError('')})
            .catch(error => {setIsLoading(true); setIsError('Something is wrong ....!');});  
    }, []);

    const [comments, setComments] = useState<Array<any>>([]);
    const [isLoadingC, setIsLoadingC] = useState<Boolean>(false);
    const [isErrorC, setIsErrorC] = useState<String>('');
    const [activeFocus, setActiveFocus] = useState<number>(0);

    useEffect(() => {
        setIsLoadingC(true);
        axios.get('https://jsonplaceholder.typicode.com/comments')
            .then(response => {setComments(response.data); setIsLoadingC(false); setIsErrorC('')})
            .catch(error => {setIsLoadingC(true); setIsErrorC('Something is wrong ....!');});
            
    }, [])


   function Posts() {
        setIsLoading(false);
        setgeneric( [...posts]);
        console.log("Post", [...posts]);
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
        setActiveFocus(0);
        setgeneric([]);
    }

    return (
        <div>
            <br />
            <br/>
             <Container>
                <Row>
                    <Col lg={12}>
                    <SpatialNavigation >
                        <Row>
                            <Col> 
                                <Focusable onFocus={Posts} onClickEnter={Posts}>
                                    <Button variant="success" className="btn-primary">
                                        Post
                                    </Button>
                                </Focusable>
                            </Col>
                            < br/>
                            <Col >
                            <Focusable  onFocus={Comments} onClickEnter={Comments}>
                                <Button variant="success" className="btn-primary">
                                    Comments
                                </Button>
                            </Focusable>
                            </Col>
                            <Col> 
                                <Focusable onFocus={Posts} onClickEnter={Posts}>
                                    <Button variant="success" className="btn-primary">
                                        Post
                                    </Button>
                                </Focusable>
                            </Col>
                            < br/>
                            <Col>
                            <Focusable  onFocus={Comments} onClickEnter={Comments}>
                                <Button variant="success" className="btn-primary">
                                    Comments
                                </Button>
                            </Focusable>
                            </Col>
                            <Col> 
                                <Focusable onFocus={Posts} onClickEnter={Posts}>
                                    <Button variant="success" className="btn-primary">
                                        Post
                                    </Button>
                                </Focusable>
                            </Col>
                            < br/>
                            <Col>
                            <Focusable  onFocus={Comments} onClickEnter={Comments}>
                                <Button variant="success" className="btn-primary">
                                    Comments
                                </Button>
                            </Focusable>
                            </Col>
                        </Row>
                        <br/>
                        <br/>
                    {
                        isLoading ? ((<Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>)) : (
                            generic.map(post =>  
                                                <Focusable  onFocus={() => focus(post)}  key={post.id} onUnFocus={() => removeFocus(post)}>
                                                <Button  className={activeFocus === post.id ? 'active' : ''}>{post.title}{post.email}</Button><br/>
                                                </Focusable>
                                                ) 
                                )
                    }
                    </SpatialNavigation>
                   </Col>
                </Row>
            </Container>
        </div>
    )
}

export default MenuBar;

