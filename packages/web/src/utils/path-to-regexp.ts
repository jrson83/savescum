// excellent regex from kwhitely/itty-router
// it takes a path and turns it into a regex for later matching
function pathToRegexp(path: string) {
  return RegExp(
    `^${
      path
        .replace(/(\/?)\*/g, '($1.*)?') // trailing wildcard
        .replace(/(\/$)|((?<=\/)\/)/, '') // remove trailing slash or double slash from joins
        .replace(/(:(\w+)\+)/, '(?<$2>.*)') // greedy params
        .replace(/:(\w+)(\?)?(\.)?/g, '$2(?<$1>[^/]+)$2$3') // named params
        .replace(/\.(?=[\w(])/, '\\.') // dot in path
        .replace(/\)\.\?\(([^\[]+)\[\^/g, '?)\\.?($1(?<=\\.)[^\\.') // optional image format
    }/*$`
  )
}

export { pathToRegexp }
