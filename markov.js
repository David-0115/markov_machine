/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    const chains = {}
    this.words.forEach((word, idx) => {

      if (chains[word]) {
        chains[word].push(this.words[idx + 1] ? this.words[idx + 1] : null);
      } else {
        chains[word] = [this.words[idx + 1] ? this.words[idx + 1] : null];
      }
    })
    this.chains = chains
  }


  /** return random text from chains */

  //{"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */
  //randomly pick a starting point, ((in), then pick the next word, (the), either(cat, hat) if cat, in else hat, null-end )

  makeText(numWords = 100) {
    let wordCount = 0;
    let currentWords = [];

    // Randomly pick a starting key
    const keys = Object.keys(this.chains);
    let currentWord = keys[Math.floor(Math.random() * keys.length)];
    currentWords.push(currentWord);

    // Generate text up to numWords words
    while (wordCount < numWords - 1) {
      const wordArr = this.chains[currentWord]; // Get the array of next possible words

      // Check if we've reached a dead end or if the word array is empty
      if (!wordArr || wordArr.length === 0 || wordArr[0] === null) {
        break;
      }

      // Randomly select the next word from the array of possible words
      const nextWord = wordArr[Math.floor(Math.random() * wordArr.length)];

      // Check if the next word is null, indicating the end of a possible chain
      if (nextWord === null) {
        break;
      }

      // Append the next word to the currentWords array and update the currentWord
      currentWords.push(nextWord);
      currentWord = nextWord;
      wordCount++;
    }

    // Join all selected words into a single string
    const text = currentWords.join(' ');
    console.log(text);
    return text; // Return the generated text
  }

}

module.exports = { 'Markov': MarkovMachine }

