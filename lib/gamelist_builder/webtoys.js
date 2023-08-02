export function generateGameHTML(game) {
  var result =
`<br>
<div class="embed-content">
  <p2 class="embed-game-title">${game.name}</p2>
  <br>
  <p2 class="embed-description">${game.description}</p2>
  <br>
  <div class="embed-game-field">
    <p2 class="embed-game-label">Download page</p2>
    <br>
    <a href="${game.downloadPage}" target="_blank"><p2 class="embed-game-value">${game.downloadPage}</p2></a>
  </div>
  <div class="embed-game-field">
    <p2 class="embed-game-label">Activity</p2>
    <br>
    <p2 class="embed-game-value">${game.activity}</p2>
  </div>`;
  for (let i = 0; i != game.connections.length; i++) {
    var connection = game.connections[i];
    var value = connection.value;
    if (value.includes('://')) value = `<a href="${value}" target="_blank">${value}</a>`;
    var connectionHTML = 
`\n  <div class="embed-game-field">
    <p2 class="embed-game-label">${connection.name}</p2>
    <br>
    <p2 class="embed-game-value">${value}</p2>
  </div>`
    result += connectionHTML;
  }
  if (game.bannerURL != null) result += `
  <img class="embed-game-bannerurl" src="${game.bannerURL}">`;
  return result + '\n</div>';
}

export function generateGameListHTML(gameList, style) {
  var now = new Date();
  var gameListHTML = '';
  if (gameList.games.length == 0) gameListHTML =
  `<br>
<div class="embed-content">
  <p1 class="embed-game-title">Failed to fetch any games. 😓</p1>
</div>`;
  for (let i = 0; i != gameList.games.length; i++) {
    var game = gameList.games[i];
    var gameHTML = generateGameHTML(game);
    gameListHTML += `\n${gameHTML}`;
  }
  var result =
`<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width" />
<title>
${gameList.name}
</title>
<link rel="icon" href="${gameList.logoURL}" type="image/icon type">
</head>
<style>
${style}
</style>
<body>
<a target="_blank" href="${gameList.websiteURL}">
<div class="embed-author">
<div class="image-cropper">
<img class="embed-author-iconurl" src="${gameList.logoURL}" padding="50" width="15">
</div>
<p1 class="embed-author-name">${gameList.name}</p1>
</div>
</a>
<div class="embed-content">
  <div class="embed-status">
    <p2 class="embed-description">Live list of games in need of players, fetched from ${gameList.name}.</p2>
    <br>
    <br>
    <p2 class="embed-description">Service website: <a href="${gameList.websiteURL}" target="_blank">${gameList.websiteURL}<a>.</p2>
    <br>
    <p2 class="embed-description">Service Discord: <a href="${gameList.discordURL}" target="_blank">${gameList.discordURL}<a>.</p2>
  </div>
</div>
${gameListHTML}
<br>
<div class="embed-content">
  <a href="${gameList.websiteURL}" target="_blank"><img class="embed-service-bannerurl" src="${gameList.bannerURL}"></a>
</div>
  <div class="embed-footer">
  <p2 class="embed-footer-text">${now.toUTCString()}</p2>
</div>
</body>
</html>`;
  return result;
}