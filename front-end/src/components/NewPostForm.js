import React, {Component} from 'react';
import {Button, Col, Form, FormGroup, Input, Label} from "reactstrap";

class NewPostForm extends Component {
	state = {
		title: '',
		description: '',
		image: null
	};

	inputChangeHandler = event => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	fileChangeHandler = event => {
		this.setState({
			[event.target.name]: event.target.files[0]
		})
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
			<Form onSubmit={this.submitHandler}
				  style={{marginTop: '50px'}}
			>
				<h1>Add new post</h1>
				<FormGroup row>
					<Label for="title" sm={2}>Title</Label>
					<Col sm={10}>
						<Input type="text"
							   name="title"
							   id="title"
							   placeholder="Enter title"
							   value={this.state.title}
							   onChange={this.inputChangeHandler}
							   required
						/>
					</Col>
				</FormGroup>
				<FormGroup row>
					<Label for="description" sm={2}>Description</Label>
					<Col sm={10}>
						<Input type="text"
							   name="description"
							   id="description"
							   placeholder="Enter description"
							   value={this.state.description}
							   onChange={this.inputChangeHandler}
							   required
						/>
					</Col>
				</FormGroup>
				<FormGroup row>
					<Label for="image" sm={2}>Image</Label>
					<Col sm={10}>
						<Input type="file"
							   name="image"
							   id="image"
							   onChange={this.fileChangeHandler}
						/>
					</Col>
				</FormGroup>
				<FormGroup row>
					<Col sm={{size: 10, offset: 2}}>
						<Button color="primary" type='submit'>Save</Button>
					</Col>
				</FormGroup>
			</Form>
		);
	}
}

export default NewPostForm;