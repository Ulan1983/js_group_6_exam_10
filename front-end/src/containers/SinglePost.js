import React, {Component, Fragment} from 'react';
import {Button, Card, CardText} from "reactstrap";
import {createNewComment, fetchSinglePost} from "../store/actions";
import {connect} from "react-redux";
import CommentForm from "../components/CommentForm";

class SinglePost extends Component {

	componentDidMount() {
		this.props.fetchSinglePost(this.props.match.params.id);
	}

	createCommentHandler = async (formData) => {
		await this.props.createNewComment(formData);
	};

	render() {
		return (
			<Fragment>
				{this.props.singlePost && (
					<Card
						key={this.props.singlePost.id}
						style={{padding: '10px'}}
					>
						<CardText
							style={{fontSize: '24px', fontWeight: 'bold'}}
						>
							{this.props.singlePost.title}
						</CardText>
						<CardText>
							At {this.props.singlePost.date}
						</CardText>
						<CardText
							style={{fontWeight: 'bold'}}
						>
							{this.props.singlePost.description}
						</CardText>
					</Card>
				)}
				<h1 style={{marginTop: '10px'}}>Comments</h1>
				{this.props.comments.map(comment => (
					<Card
						key={comment.id}
						style={{marginTop: '20px', padding: '10px'}}
					>
						<CardText style={{fontWeight: 'bold'}}>
							{comment.name} wrote:
						</CardText>
						<CardText>
							{comment.comment}
						</CardText>
						<Button
							type='submit'
							style={{width: '100px'}}
						>Delete</Button>
					</Card>
				))}
				<CommentForm
					onSubmit={this.createCommentHandler}
				/>
			</Fragment>
		);
	}
}

const mapStateToProps = state => ({
	singlePost: state.singlePost,
	comments: state.comments
});

const mapDispatchToProps = dispatch => ({
	fetchSinglePost: id => dispatch(fetchSinglePost(id)),
	createNewComment: data => dispatch(createNewComment(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(SinglePost);