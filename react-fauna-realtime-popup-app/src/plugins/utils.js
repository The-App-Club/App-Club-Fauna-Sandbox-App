import {default as chance} from 'chance';
import {LoremIpsum} from 'lorem-ipsum';
const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});
const createData = () => {
  return {
    id: chance().guid(),
    name: chance().name(),
    message: lorem.generateSentences(1),
    thumbnail: `https://picsum.photos/seed/${chance().integer({
      min: 1,
      max: 300,
    })}/200/300`,
    price: chance().integer({min: 100, max: 300}),
  };
};

export {createData};
