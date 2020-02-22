import React, {Component} from 'react';
import NewPostForm from "../components/NewPostForm";
import {createNewPost} from "../store/actions";
import {connect} from "react-redux";

class NewPost extends Component {
	createPostHandler = async (formData) => {
		await this.props.createNewPost(formData);
		this.props.history.push('/');
	};
	render() {
		return (
			<NewPostForm
				onSubmit={this.createPostHandler}
			/>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	createNewPost: data => dispatch(createNewPost(data))
});

export default connect(null, mapDispatchToProps)(NewPost);