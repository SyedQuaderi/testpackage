import React from 'react';
import { Row, Col, Card} from 'react-bootstrap';
import '../HomePage/HomePage.scss';

function RecentContent(props) {
    return (
        <div>
            <Col sm={3} className="pt-5">
                <Row>
                    <Col>
                        <h3 className="sub-menu-title text-left pl-3"> Recent</h3>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card id="sub-menu-recent-content" bg="danger" text="white" >
                            <Card.Body >
                                <Card.Title className="pt-5 ">{props.recentContent.mainMenu.name}</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Col>
        </div>
    )
}

export default RecentContent
