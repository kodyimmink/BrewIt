import React from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, FormGroup} from 'reactstrap';
import StarRating from './StarRating';

import { connect } from 'react-redux';
import { actions } from '../store';

class ReviewModal extends React.Component {
  constructor() {
    super();
    this.state = {
      reviewModal: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      reviewModal: !this.state.reviewModal,
    })
  }
 
  render() {
    return (
        <div>
          <Button onClick={this.toggle} size='md' color="info">Review</Button>
            <Modal isOpen={this.state.reviewModal} toggle={this.toggle}>
              <ModalHeader>Review: {this.props.brewery.name}</ModalHeader>
                <ModalBody>
                  <FormGroup>
                    <StarRating userId={this.props.user.uid} item={this.props.brewery}/>
                  </FormGroup>
                  <FormGroup>
                    <Input type="textarea" name="text" id="exampleText" />
                  </FormGroup>
                </ModalBody>
                <ModalFooter>
                <Button color="primary">Submit</Button>{' '}
              </ModalFooter>
            </Modal>
        </div>
      );
    }
  }

  function mapStateToProps(state){
    return {
      reviewModal: state.reviewModal,
      user: state.user
    };
  }

  function mapDispatchToProps(dispatch){
    return {
      onToggleReviewModal(modalBool){
        dispatch(actions.toggleReviewModal(modalBool));
      },
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(ReviewModal);