console.log("dummy");

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js');
}