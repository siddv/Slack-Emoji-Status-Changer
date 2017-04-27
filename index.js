require('isomorphic-fetch');
require('dotenv').config()

const tokens = process.env.SLACK_API_TOKENS.split(','),
      emojiList = require('./emojis.json').emojis,
      numOfEmojis = emojiList.length,
      timeout = 5000;

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

  let emoji = getRandomEmoji(),

      url = `https://slack.com/api/users.profile.set?token=${token}&profile=` + encodeURIComponent(JSON.stringify({
        'status_emoji': emoji,
        'status_text': `Emoji successfully changed ${counter} times.`
      })),

      setEmojiAgain = function () {
        setTimeout(() => {
          setEmoji(token, counter);
        }, timeout);
      }

  fetch(url).then(response => {

    if (response.status >= 400) {

      return new Promise(resolve => {
        resolve({
          error: 'network problems'
        });
      });

    }
    
    return response.json();
    
  }).then(data => {

      console.log(`Emoji successfully changed ${counter} times. Current: ${emoji}`);
      counter++;
      setEmojiAgain();
    
    })
    .catch(error => {

      console.log(`On no. It broke for other reasons: ${error}\nTrying again...`);
      setEmojiAgain();

    })
}

/**
 * Do the thing
 */
tokens.forEach(token => setEmoji(token, 1));