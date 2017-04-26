require('isomorphic-fetch');
const tokens = require('./slack-api-tokens');

const timeout = 5000;
const emojiList = require('./emoji-list');
const numOfEmojis = emojiList.length;

/**
 * Returns a random emoji from the above list
 */
const getRandomEmoji = function () {
  return emojiList[Math.floor(Math.random() * numOfEmojis)];
};

/**
 * Sets the your slack status emoji until you stop the script with intervals defined in 'timeout' above
 */
const setEmoji = function (token, counter) {

  let emoji = getRandomEmoji();
	let url = `https://slack.com/api/users.profile.set?token=${token}&profile=` + encodeURIComponent(JSON.stringify({
    'status_emoji': emoji,
    'status_text': `Emoji successfully changed ${counter} times.`
  }));

  fetch(url).then((response) => {
      if(response.status >= 400) {

        throw new Error('On no. It broke.');

      }

      return response.json();

    })
    .then((data) => {
      console.log(`Emoji successfully changed ${counter} times. Current: ${emoji}`);
      counter++;

      setTimeout(() => {
        setEmoji(token, counter);
      }, timeout);
    });
};

/**
 * Do the thing
 */
tokens.forEach(token => setEmoji(token, 1));