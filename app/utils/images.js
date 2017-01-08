import React from 'react'

/** display a fixed sized image */
export default (options) => {
  let {w, h, random, gray} = options;
  let url = `https://unsplash.it/${gray ? "g/" : ''}${w}/${h}/${random ? "?random" : ''}`
  return <img src={url} />
}