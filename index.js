const IPTC_ENTRY_TYPES = new Map([
  [0x05, 'title'],
  [0x78, 'caption'],
  [0x6E, 'credit'],
  [0x19, 'keywords'],
  [0x37, 'dateCreated'],
  [0x50, 'byline'],
  [0x55, 'bylineTitle'],
  [0x7A, 'captionWriter'],
  [0x69, 'headline'],
  [0x74, 'copyright'],
  [0x0F, 'category'],
]);

const IPTC_ENTRY_MARKER = Buffer.from([0x1c, 0x02]);

module.exports = buffer => {
  if (!Buffer.isBuffer(buffer)) return {};

  let iptc = {};
  let lastIptcEntryPos = buffer.indexOf(IPTC_ENTRY_MARKER);

  while (lastIptcEntryPos !== -1) {
    lastIptcEntryPos = buffer.indexOf(IPTC_ENTRY_MARKER, lastIptcEntryPos + IPTC_ENTRY_MARKER.byteLength);

    let iptcBlockTypePos = lastIptcEntryPos + IPTC_ENTRY_MARKER.byteLength;
    let iptcBlockSizePos = iptcBlockTypePos + 1;
    let iptcBlockDataPos = iptcBlockSizePos + 2;

    let iptcBlockType = buffer.readUInt8(iptcBlockTypePos);
    let iptcBlockSize = buffer.readUInt16BE(iptcBlockSizePos);

    if (!IPTC_ENTRY_TYPES.has(iptcBlockType)) {
      continue;
    }

    if (iptcBlockSize > buffer.length - (iptcBlockDataPos + iptcBlockSize)) {
      throw new Error('Invalid IPTC directory');
    }

    let iptcBlockTypeId = IPTC_ENTRY_TYPES.get(iptcBlockType);
    let iptcData = buffer.slice(iptcBlockDataPos, iptcBlockDataPos + iptcBlockSize).toString();

    if (iptc[iptcBlockTypeId] == null) {
      iptc[iptcBlockTypeId] = iptcData;
    } else if (Array.isArray(iptc[iptcBlockTypeId])) {
      iptc[iptcBlockTypeId].push(iptcData);
    } else {
      iptc[iptcBlockTypeId] = [iptc[iptcBlockTypeId], iptcData];
    }
  }

  return iptc;
};