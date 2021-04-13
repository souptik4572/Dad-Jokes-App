import React, { Component } from 'react';
import './Joke.css';

class Joke extends Component {
	constructor(props) {
		super(props);
		this.handleVoteUp = this.handleVoteUp.bind(this);
		this.handleVoteDown = this.handleVoteDown.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}
	handleVoteUp() {
		this.props.changeVotes(this.props.jokeProps.id, true);
	}
	handleVoteDown() {
		this.props.changeVotes(this.props.jokeProps.id, false);
	}
	handleDelete() {
		this.props.deleteAJoke(this.props.jokeProps.id);
	}
	render() {
		const jokeProps = this.props.jokeProps;
		const customStyle = {
			borderColor: jokeProps.color
		};
		return (
			<div className='Joke'>
				<div className='Joke-delete'>
					<i className='fas fa-trash' onClick={this.handleDelete}/>
				</div>
				<div className='Joke-buttons'>
					<i className='fas fa-arrow-up' onClick={this.handleVoteUp} />
					<span className='Joke-votes' style={customStyle}>
						{jokeProps.votes}
					</span>
					<i className='fas fa-arrow-down' onClick={this.handleVoteDown} />
				</div>
				<div className='Joke-text'>{jokeProps.joke}</div>
				<div className='Joke-emoji'>
					<i className={`em em-${jokeProps.emoji}`} />
				</div>
			</div>
		);
	}
}

export default Joke;
