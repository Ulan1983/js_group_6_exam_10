import React, {Component, Fragment} from 'react';
import {deletePost, fetchNews} from "../store/actions";
import {connect} from "react-redux";
import {Button, Card, CardText} from "reactstrap";
import {NavLink} from "react-router-dom";

class News extends Component {
	componentDidMount() {
		this.props.fetchNews();
	}

	render() {
		return (
			<Fragment>
				{this.props.news.map(post => (
					<Card key={post.id}
						  style={{marginTop: '10px', padding: '10px'}}
					>
						{post.image &&
						<img src={'http://localhost:8000/uploads/' + post.image}
							 alt='post'
							 className='img-thumbnail'
							 style={{maxWidth: '120px', maxHeight: '120px'}}
						/>
						}
						<CardText>
							{post.title}
						</CardText>
						<CardText>
							{post.date}
						</CardText>
						<NavLink to={'/news/' + post.id}>Read full post</NavLink>
						<Button
							type='submit'
							style={{width: '100px', marginTop: '10px'}}
							id={post.id}
							onClick={this.props.deletePost}
						>
							Delete
						</Button>
					</Card>
				))}
			</Fragment>
		);
	}
}

const mapStateToProps = state => ({
	news: state.news
});

const mapDispatchToProps = dispatch => ({
	fetchNews: () => dispatch(fetchNews()),
	deletePost: id => dispatch(deletePost(id.currentTarget.id))
});

export default connect(mapStateToProps, mapDispatchToProps)(News);