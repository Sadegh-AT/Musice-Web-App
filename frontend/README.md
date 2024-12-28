
# Dark Souls OST Music App

This website lets you download and play the Dark Souls soundtrack. It has two modes - light and dark - for a customized experience.


## Technology

🔸Tailwind

## Demo

![Project Demo](https://github.com/Sadegh-AT/Musice-Web-App/blob/master/demo.png)
## Code Explanation

To add a track to the page, first upload the music file. Then, add the track name to the corresponding section of code in the app.js file:

```javascript
new MusicTrack(musicTable, [
  "Prologue",
  "Firelink Shrine",
  "Taurus Demon",
  "Bell Gargoyle",
]);
```

The "player.js" file contains code for an audio player. One of the functions is "formatTime," which takes in milliseconds and converts them into minutes and seconds format:


```javascript
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}
```
