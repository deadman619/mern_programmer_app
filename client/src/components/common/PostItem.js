import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faTimes } from '@fortawesome/free-solid-svg-icons';
import { deletePost, addUpvote, removeUpvote } from '../../actions/postActions';

class PostItem extends Component {
	onDeleteClick(id) {
		this.props.deletePost(id);
	}

	onUpvoteClick(id) {
		if (this.isUpvoted()) {
			this.props.removeUpvote(id);
		} else {
			this.props.addUpvote(id);
		}
	}

	isUpvoted() {
		let postUpvotesByUser = this.props.post.upvotes.filter(post => post.user === this.props.auth.user.id);
		if (postUpvotesByUser.length > 0) {
			return true;
		}
		return false;
	}

	render() {
		const {post, auth, showActions} = this.props;
		return (
			<div className="card card-body mb-3">
				<div className="row">
					<div className="col-md-2">
						<a>
							<img src={post.profileIcon} alt="profile icon" className="rounded d-none d-md-block" />
						</a>
						<br />
						<p className="text-center">{post.name}</p>
					</div>
					<div className="col-md-10">
						<p className="lead">{post.text}</p>
						{showActions ? (
							<span>
								<button onClick={this.onUpvoteClick.bind(this, post._id)} type="button" className="btn btn-light mr-1">
									<FontAwesomeIcon 
									className={this.isUpvoted() ? "text-danger":"text-dark"} 
									icon={this.isUpvoted() ? faThumbsDown : faThumbsUp} 
									/>
									<span className="badge badge-light">{post.upvotes.length}</span>
								</button>
								<Link to={`/post/${post._id}`} className="btn btn-dark mr-1">Comments</Link>
								{post.user === auth.user.id ? (
									<button onClick={this.onDeleteClick.bind(this, post._id)} type="button" className="btn btn-danger mr-1">
										<FontAwesomeIcon icon={faTimes} />
									</button>
								) : null}
							</span>
						) : null}
					</div>
				</div>
			</div>
		);
	}
}

PostItem.defaultProps = {
	showActions: true
}

PostItem.propTypes = {
	deletePost: PropTypes.func.isRequired,
	addUpvote: PropTypes.func.isRequired,
	removeUpvote: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps, {deletePost, addUpvote, removeUpvote})(PostItem);