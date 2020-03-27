import React from 'react';
import {Modal, Button, Form, Row, Col} from 'react-bootstrap';

function AddGoal(props) {
  
  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Goal</Modal.Title>
        </Modal.Header>
        <Modal.Body className="ml-5">
            <p className="goal-intro">It is important to work with your Care Team when you set these goals</p>
            <Row>
                <Col sm={12}>
                    <Form>
                        <Row>
                          <Col sm={2} className="mt-2">
                              <Form.Label >Title</Form.Label>
                          </Col>
                          <Col sm={8}>
                              <Form.Control id="goalTitle" type="text" placeholder="Insert a title for your Goal here" required />
                          </Col>
                        </Row>
                        <Row className="mt-4"></Row>       
                        <Row>
                            <Col sm={2}>
                                <Form.Label>Description</Form.Label>
                            </Col>
                            <Col sm={8}>
                                <Form.Control  id="goalDescription" as="textarea" rows="5" required/>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
            <Row className="mt-4"></Row>
            <Row className="mr-4">
              <Col className="col-sm-6">
              </Col>
              <Row > 
                <Col sm={6}>
                  <Button className="cancel-goal" variant="secondary" onClick={props.handleClose}>
                    Close
                  </Button>
                </Col>
                <Col sm={6}>
                  <Button className="save-goal" variant="primary" onClick={props.handleClose}>
                    Save Goal
                  </Button>
                </Col>
              </Row>
              <Col sm={2}>
              </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddGoal;
