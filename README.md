# Lipsumator

Lipsumator is a custom lorem ipsum generator.

## CLI

Lipsumator comes with a CLI. Install Lipsumator globally to get access to it: `npm i -g lipsumator`

Fishy ipsum

`lipsumator --paragraphs 1 -d goldfish -d mahi-mahi -d atlantic\ cod -d swordfish -d zebrafish -d carp`

Fishier ipsum

`lipsumator --concentration 0.75 --paragraphs 1 --dictionary goldfish,mahi-mahi,atlantic\ cod,swordfish,zebrafish,carp`

## Templating

Lipsumator can apply templates to its output using the `templateAll` and `templateEach` options. A useful application of this is to generate HTML.

For example, you could generate a list using the CLI and its shortcut flags `ta` (templateAll) and `te` (templateEach).

`lipsumator -s 5 --ta '<ul>${lipsum}</ul>' --te '<li>${lipsum}</li>'`

Lipsumator is not designed specifically to output HTML, so does not include functionality to output formatted HTML. You can pipe the CLI output to a tool such as [HTML](https://npmjs.com/html) to format it:

`lipsumator -s 5 --ta '<ul>${lipsum}</ul>' --ta '<li>${lipsum}</li>' | html`

## API

Lipsumator exposes a stream, string, and generator API.

### Stream API

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

### Generator API

```
const { generators } = require('lipsumator');

for(const word in generator.words(5)) {
  console.log(word);
}
```