import React, {Component} from 'react';
import {Button, Col, Form, FormGroup, Input, Label} from "reactstrap";
import {fetchComments} from "../store/actions";
import {connect} from "react-redux";

class CommentForm extends Component {
	state = {
		name: '',
		comment: ''
	};

	componentDidMount() {
		this.props.fetchComments();
	}

	inputChangeHandler = event => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	submitHandler = event => {
		event.preventDefault();

		const formData = new FormData();

		Object.keys(this.state).forEach(key => {
			if (this.state[key]) {
				formData.append(key, this.state[key]);
			}
		});

		this.props.onSubmit(formData)
	};

	render() {
		return (
			<Form
				style={{marginTop: '20px'}}
				onSubmit={this.submitHandler}
			>
				<h1>Add comment</h1>
				<FormGroup row>
					<Label for="title" sm={2}>Name</Label>
					<Col sm={10}>
						<Input type="text"
							   name="name"
							   id="name"
							   placeholder="Enter name"
							   value={this.state.name}
							   onChange={this.inputChangeHandler}
						/>
					</Col>
				</FormGroup>
				<FormGroup row>
					<Label for="comment" sm={2}>Comment</Label>
					<Col sm={10}>
						<Input type="text"
							   name="comment"
							   id="comment"
							   placeholder="Enter comment"
							   value={this.state.comment}
							   onChange={this.inputChangeHandler}
							   required
						/>
					</Col>
				</FormGroup>
				<FormGroup row>
					<Col sm={{size: 10, offset: 2}}>
						<Button color="primary" type='submit'>Add</Button>
					</Col>
				</FormGroup>
			</Form>
		);
	}
}

const mapStateToProps = state => ({
	comments: state.comments
});

const mapDispatchToProps = dispatch => ({
	fetchComments: () => dispatch(fetchComments())
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);