import React, {Component, Fragment} from 'react';
import {fetchNews} from "../store/actions";
import {connect} from "react-redux";
import {Card, CardText} from "reactstrap";

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
	fetchNews: () => dispatch(fetchNews())
});

export default connect(mapStateToProps, mapDispatchToProps)(News);