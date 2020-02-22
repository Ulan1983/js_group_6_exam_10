import React, {Component, Fragment} from 'react';
import {Card, CardText} from "reactstrap";
import {fetchSinglePost} from "../store/actions";
import {connect} from "react-redux";

class SinglePost extends Component {
	componentDidMount() {
		this.props.fetchSinglePost(this.props.match.params.id);
	}

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
			</Fragment>
		);
	}
}

const mapStateToProps = state => ({
	singlePost: state.singlePost
});

const mapDispatchToProps = dispatch => ({
	fetchSinglePost: id => dispatch(fetchSinglePost(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(SinglePost);