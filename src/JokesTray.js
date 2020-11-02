import React, { Component } from 'react';
import './JokesTray.css';

import Joke from './Joke';
import axios from 'axios';
import FlipMove from 'react-flip-move';

import { pickEmojiAndColor, sortTheJokes } from './helper';

const API_URL = 'https://icanhazdadjoke.com/';

class JokesTray extends Component {
	static defaultProps = {
		jokeLimit: 10
	};
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			jokes: []
		};
		this._seenJokes = new Set();
		this.changeVotes = this.changeVotes.bind(this);
		this.fetchNewJokes = this.fetchNewJokes.bind(this);
		this.deleteAJoke = this.deleteAJoke.bind(this);
	}
	async getLimitedJokes() {
		const jokes = [];
		while (jokes.length < this.props.jokeLimit) {
			const res = await axios.get(API_URL, {
				headers: {
					Accept: 'application/json'
				}
			});
			const actualData = res.data;
			let jokeData = {
				id: actualData['id'],
				joke: actualData['joke'],
				votes: 0
			};
			const emojiAndColor = pickEmojiAndColor(jokeData.votes);
			jokeData = { ...jokeData, ...emojiAndColor };
			if (!this._seenJokes.has(jokeData.id)) {
				jokes.push(jokeData);
				this._seenJokes.add(jokeData.id);
			}
			else console.log('Found a Duplicate');
		}
		this.setState(oldState => {
			return { jokes: [ ...oldState.jokes, ...jokes ], isLoading: false };
		});
	}
	fetchNewJokes() {
		this.setState({ isLoading: true }, this.getLimitedJokes);
	}
	changeVotes(uniqueId, isUpVote) {
		let updatedJokes = this.state.jokes.map(theJoke => {
			if (theJoke.id === uniqueId) {
				const newVoteCount = isUpVote ? theJoke.votes + 1 : theJoke.votes - 1;
				const newEmojiAndColor = pickEmojiAndColor(newVoteCount);
				return {
					...theJoke,
					votes: newVoteCount,
					emoji: newEmojiAndColor.emoji,
					color: newEmojiAndColor.color
				};
			}
			return theJoke;
		});
		updatedJokes = sortTheJokes(updatedJokes);
		this.setState({ jokes: updatedJokes });
	}
	deleteAJoke(uniqueId) {
		const existingJokes = this.state.jokes.filter(aJoke => {
			return aJoke.id !== uniqueId;
		});
		this.setState({ jokes: existingJokes });
	}
	componentDidMount() {
		const json = localStorage.getItem('allJokes');
		if (json === null) {
			this.getLimitedJokes();
		}
		else {
			const existingJokes = JSON.parse(json);
			this.setState({ jokes: existingJokes });
		}
		this.state.jokes.forEach(aJoke => {
			this._seenJokes.add(aJoke.id);
		});
	}
	componentDidUpdate() {
		const local = this.state.jokes;
		localStorage.setItem('allJokes', JSON.stringify(local));
	}
	render() {
		const allJokes = this.state.jokes.map(aJoke => {
			return (
				<Joke key={aJoke.id} jokeProps={aJoke} changeVotes={this.changeVotes} deleteAJoke={this.deleteAJoke} />
			);
		});
		const loader = (
			<div className='JokesTray-spinner'>
				<i className='fas fa-smile fa-spin fa-lg' />
				<h1 className='JokesTray-title'>Loading...</h1>
			</div>
		);
		const emptyTray = (<p>No running jokes are available 😢</p>)
		if (this.state.isLoading) {
			return loader;
		}
		return (
			<div className='JokesTray'>
				<div className='JokesTray-sidebar'>
					<h1 className='JokesTray-title'>
						<span>Dad</span> Jokes
					</h1>
					<img
						src='https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg'
						alt='a Smiley icon'
					/>
					<button className='JokesTray-getmore' onClick={this.fetchNewJokes}>
						Fetch Jokes
					</button>
					<button className='JokesTray-deleteAll'>
						Delete All
					</button>
				</div>
				<div className='JokesTray-alljokes'>
					{this.state.jokes.length === 0 ? emptyTray : <FlipMove>{allJokes}</FlipMove>}
				</div>
			</div>
		);
	}
}

export default JokesTray;
