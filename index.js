require('isomorphic-fetch');
require('dotenv').config();

const emojiList = require('./emojis.json').emojis;
const token = process.env.SLACK_API_TOKEN;
const timeout = 5000;

const numOfEmojis = emojiList.length;
let counter = 0;

/**
 * Returns a random emoji from the above list
 */
const getRandomEmoji = function () {
  return emojiList[Math.floor(Math.random() * numOfEmojis)];
}

/**
 * Sets the your slack status emoji until you stop the script with intervals defined in 'timeout' above
 */
const setEmoji = function () {

  let emoji = getRandomEmoji();
	let url = 'https://slack.com/api/users.profile.set?token=' + token + '&profile=' + encodeURIComponent(JSON.stringify({'status_emoji': emoji}));
  
  fetch(url).then((response) => {

      return response.json();

    })
    .then((data) => {
      
      if (data.error) {
        
        console.error(`On no. It broke: ${data.error}`);
        throw new Error(`On no. It broke: ${data.error}`);

      } else {

        setTimeout(() => {

          counter++; 
          console.log(`Emoji successfully changed ${counter} times. Current: ${emoji}`);
          setEmoji();

        }, timeout);  

      }
  
    });

}

/** 
 * Do the thing
 */
setEmoji();