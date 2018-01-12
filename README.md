# iptc-reader [![Build Status](https://travis-ci.org/oaleynik/iptc-reader.svg?branch=master)](https://travis-ci.org/oaleynik/iptc-reader)

> Parse IPTC directory from buffer (similar to devongovett/exif-reader)


## Install

```sh
$ npm install --save iptc-reader
```

## Usage

```javascript
var iptc = require('iptc-reader');

// decode raw iptc data from a buffer
var metadata = iptc(buf);
```

Output:

```javascript
{ keywords: [ 'some', 'useful', 'tags' ],
  dateCreated: '20170101',
  byline: 'Author Name',
  copyright: 'Copyright © Copyright',
  caption: 'I\'ve taken this image during our short stop in wonderland' }
```

### Supported tags

```
caption, credit, keywords, dateCreated, byline, bylineTitle, captionWriter, headline, copyright, category
```

## License

MIT © [Oleh Aleinyk](https://github.com/oaleynik)
