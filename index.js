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

    if (response.status >= 400) {

      return new Promise((resolve) => {

        resolve({

          error: 'network problems'
        
        });

      });

    }
    
    return response.json();
    
    })
    .then((data) => {
      
      if (data.error) {
        
        console.log(`On no. It broke: ${data.error}\nTrying again...`);

      } else {

        counter++; 
        console.log(`Emoji successfully changed ${counter} times. Current: ${emoji}`);

      }

      setTimeout(() => {

        setEmoji();

      }, timeout);  

    })
    .catch((error) => {

      console.log(`On no. It broke for other reasons: ${error}\nTrying again...`);

      setTimeout(() => {

        setEmoji();

      }, timeout); 

    })

}

/** 
 * Do the thing
 */
setEmoji();