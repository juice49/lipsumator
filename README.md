# Lipsumator

Lipsumator is a custom lorem ipsum generator.

## CLI

Lipsumator comes with a CLI. Install Lipsumator globally to get access to it: `npm i -g lipsumator`

Fishy ipsum

`lipsumator --paragraphs 1 --dictionary 'goldfish,mahi-mahi,atlantic\ cod,swordfish,zebrafish,carp'`

Fishier ipsum

`lipsumator --concentration 0.75 --paragraphs 1 --dictionary goldfish,mahi-mahi,atlantic\ cod,swordfish,zebrafish,carp`

## API

Lipsumator exposes a stream and a string API.

Example:
```
const { stream } = require('lipsumator');

const lipsum = stream({
  type: 'paragraphs',
  quantity: 1,
  dictionary: [
    'bob',
    'linda',
    'tina',
    'gene',
    'louise',
    'teddy',
    'mort',
    'mr frond',
    'gayle'
  ]
});

lipsum.pipe(process.stdout);
```