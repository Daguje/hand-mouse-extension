import '@styles/tailwind.css';
function browserName() {
  let browserName = 'No browser detected';
  if (
    /browser/gi.test(navigator.userAgent) &&
    /Google Inc/.test(navigator.vendor)
  )
    browserName = 'browser';
  if (/Edg/gi.test(navigator.userAgent)) browserName = 'edge';
  return browserName;
}
console.log(browserName());
