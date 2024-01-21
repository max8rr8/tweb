// import { AUDIO_DATA } from "./au/audioData.js";

export type AudioSample = {
  data: number[]
  cts: number
  timescale: number
}


function ebmlEncodeVint(x: number): number[] {
  if(x == 0) return [0b10000000]
  const bytesCnt = Math.ceil(Math.log2(x) / 7)

  const marker = 0b10000000 >> (bytesCnt - 1)
  const markerSetter = marker << ((bytesCnt - 1) * 8)
  x = x | markerSetter

  const res: number[] = []
  for(let i = 0; i < bytesCnt; i++) {
    res.push(x & 0xff)
    x >>= 8
  }
  return res.reverse()
}

function ebmlEncodeBlock(type: number[], data: number[]) {
  return type.concat(ebmlEncodeVint(data.length), data)
}

export function createOpusWebmInit(applyOpusFixer: boolean) {
  let decoderSpecificInfo = [
    0x4f, 0x70, 0x75, 0x73, 0x48, 0x65, 0x61, 0x64, 0x01, 0x02,
    0x00, 0x00, 0x80, 0xbb, 0x00, 0x00, 0x00, 0x00, 0xff, 0x02,
    0x00, 0x00, 0x01
  ]

  if(applyOpusFixer) {
    decoderSpecificInfo = [
      0x4f, 0x70, 0x75, 0x73, 0x48, 0x65, 0x61, 0x64, 0x01, 0x02,
      0x00, 0x00, 0x80, 0xbb, 0x00, 0x00, 0x00, 0x00, 0x00
    ]
  }

  return [
    // WebM EBML HEADER
    0x1a, 0x45, 0xdf, 0xa3, 0x9f, 0x42, 0x86, 0x81, 0x01, 0x42, 0xf7, 0x81, 0x01,
    0x42, 0xf2, 0x81, 0x04, 0x42, 0xf3, 0x81, 0x08, 0x42, 0x82, 0x84, 0x77, 0x65,
    0x62, 0x6d, 0x42, 0x87, 0x81, 0x04, 0x42, 0x85, 0x81, 0x02,

    // Segment start
    0x18, 0x53, 0x80, 0x67, 0x01, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,

    // Segment info
    0x15, 0x49, 0xa9, 0x66, 0xb2, 0x2a, 0xd7, 0xb1, 0x83, 0x0f, 0x42, 0x40, 0x4d,
    0x80, 0x8d, 0x4c, 0x61, 0x76, 0x66, 0x36, 0x30, 0x2e, 0x31, 0x36, 0x2e, 0x31,
    0x30, 0x30, 0x57, 0x41, 0x8d, 0x4c, 0x61, 0x76, 0x66, 0x36, 0x30, 0x2e, 0x31,
    0x36, 0x2e, 0x31, 0x30, 0x30, 0x44, 0x89, 0x88, 0x40, 0x8f, 0x40, 0x00, 0x00,
    0x00, 0x00, 0x00,

    // Tracks
    ...ebmlEncodeBlock([0x16, 0x54, 0xae, 0x6b], ebmlEncodeBlock([0xae], [
      // Generatl track info
      0xd7, 0x81, 0x01, 0x73, 0xc5, 0x88, 0xd7, 0xc2, 0x8a, 0xfb, 0x2d, 0x28, 0x57,
      0x2c, 0x9c, 0x81, 0x00, 0x22, 0xb5, 0x9c, 0x83, 0x75, 0x6e, 0x64, 0x86, 0x86,
      0x41, 0x5f, 0x4f, 0x50, 0x55, 0x53, 0x56, 0xbb, 0x84, 0x04, 0xc4, 0xb4, 0x00,
      0x83, 0x81, 0x02,

      // Audio track
      // Now we would have wanted to generate that info
      // Except it is completely broken in incoming fragments
      // And encoders ignore it completely
      0xe1, 0x91,
      0x9f, 0x81, 0x02, // Channels
      0xb5, 0x88, 0x40, 0xe7, 0x70, 0x00, 0x00, 0x00, 0x00, 0x00, // Frequence
      0x62, 0x64, 0x81, 0x20, // Bit depth

      // Decoder specific info
      ...ebmlEncodeBlock([0x63, 0xa2], decoderSpecificInfo)
    ]))
  ]
}

function fixupSafariOpusFrame(frame: number[]) {
  let pos = 0
  const frameToc = frame[pos++]
  if((frameToc & 3) == 0) {
    let len = frame[pos++];
    if(len >= 252) len += frame[pos++] * 4;
    pos += len
  }

  return frame.slice(pos)
}

function createBlock(frame: AudioSample, applyOpusFixer: boolean) {
  if(applyOpusFixer)
    frame.data = fixupSafariOpusFrame(frame.data)

  const timeStamp = (frame.cts * 1000) / frame.timescale
  const header = [
    0xa3, // EMBL ID (Simple Block)
    ...ebmlEncodeVint(frame.data.length + 4), // LENGTH,
    0x81, // TRACK_ID (varint)
    (timeStamp >> 8) & 0xff,
    timeStamp & 0xff, // TIMESTAMP
    0x80 // FLAGS (keyframe)
  ]
  return header.concat(frame.data)
}

export function createOpusWebmCluster(data: AudioSample[], time: number, applyOpusFixer: boolean) {
  const clusterBodies = data.map(e=>createBlock(e, applyOpusFixer))
  const totalLen = clusterBodies.reduce((a, b) => a + b.length, 10) // 10 for timestampt

  const timeOfCluster: number[] = []
  for(let i = 0; i < 8; i++) {
    timeOfCluster.push(time & 0xff)
    time >>= 8
  }

  const header = [
    0x1f,
    0x43,
    0xb6,
    0x75, // EBML ID (Cluster)
    ...ebmlEncodeVint(totalLen), // LENGTH
    0xe7,
    0x88,
    ...timeOfCluster.reverse()
  ]
  const res = header.concat(...clusterBodies)

  return res
}

// createCluster(AUDIO_DATA)
