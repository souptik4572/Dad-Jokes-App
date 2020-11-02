const allEmojis = [
	'angry',
	'confused',
	'neutral_face',
	'slightly_smiling_face',
	'smiley',
	'laughing',
	'rolling_on_the_floor_laughing'
];

const allColors = [ '#f44336', '#ff9800', '#ffc107', '#ffeb3b', '#cddc39', '#8bc34a', '#4caf50' ];

function pickEmojiAndColor(voteCount) {
	let emojiAndColor;
	if (voteCount < 0) {
		emojiAndColor = { emoji: allEmojis[0], color: allColors[0] };
	} else if (voteCount < 3) {
		emojiAndColor = { emoji: allEmojis[1], color: allColors[1] };
	} else if (voteCount < 6) {
		emojiAndColor = { emoji: allEmojis[2], color: allColors[2] };
	} else if (voteCount < 9) {
		emojiAndColor = { emoji: allEmojis[3], color: allColors[3] };
	} else if (voteCount < 12) {
		emojiAndColor = { emoji: allEmojis[4], color: allColors[4] };
	} else if (voteCount < 15) {
		emojiAndColor = { emoji: allEmojis[5], color: allColors[5] };
	} else {
		emojiAndColor = { emoji: allEmojis[6], color: allColors[6] };
	}
	return emojiAndColor;
}

function sortTheJokes(allJokes) {
	allJokes.sort((joke1, joke2) => joke2.votes - joke1.votes);
	return allJokes;
}

export { pickEmojiAndColor, sortTheJokes };
