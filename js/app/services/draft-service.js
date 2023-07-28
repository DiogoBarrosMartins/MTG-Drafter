define(function () {
  let externals = {};
  const players = [];
  const totalPlayers = 7;

  externals.startDraftGame = async function (setCode, callbackFunction) {

    const userPlayerName = 'User';
    let boostersCreated = 0;

    for (let i = 0; i < totalPlayers; i++) {
      const player = {
        name: `Player ${i}`,
        booster: null,
        pickedCards: [],
        id: `${i}`
      };
      await generateBoosterForPlayer(player);
      players.push(player);
    }

    const userPlayer = {
      name: userPlayerName,
      booster: null,
      pickedCards: [],
      id: '7'
    };
    await generateBoosterForPlayer(userPlayer);
    players.push(userPlayer);

    if (boostersCreated === (totalPlayers + 1)) {
      callbackFunction(userPlayer.booster);
    }

    async function generateRandomBooster(setCode) {
      return new Promise((resolve) => {
        fetch(`https://api.scryfall.com/cards/search?q=set:${setCode}`)
          .then(response => response.json())
          .then(response => response.data)
          .then(cards => {
            const rareMythic = cards.filter(card => card.rarity === 'rare' || card.rarity === 'mythic');
            const uncommons = cards.filter(card => card.rarity === 'uncommon');
            const commons = cards.filter(card => card.rarity === 'common' &&
              card.name.toLowerCase() !== 'forest' &&
              card.name.toLowerCase() !== 'island' &&
              card.name.toLowerCase() !== 'swamp' &&
              card.name.toLowerCase() !== 'mountain' &&
              card.name.toLowerCase() !== 'plains');
            const booster = [];
            if (rareMythic.length > 0) {
              booster.push(mapCard(rareMythic[Math.floor(Math.random() * rareMythic.length)]));
            } else {
              booster.push(mapCard(commons[Math.floor(Math.random() * commons.length)]));
            }
            for (let i = 0; i < 3; i++) {
              booster.push(mapCard(uncommons[Math.floor(Math.random() * uncommons.length)]));
            }
            for (let i = 0; i < 11; i++) {
              booster.push(mapCard(commons[Math.floor(Math.random() * commons.length)]));
            }
            boostersCreated++;
            resolve(booster);
          });
      });
    }


    function mapCard(card) {
      return {
        name: card.name,
        id: card.id,
        card: card.image_uris ? card.image_uris.normal : card.card_faces[0].image_uris.normal,
        rarity: card.rarity,
        colors: card.colors,
        art: card.image_uris.art_crop
      };
    }



    async function generateBoosterForPlayer(player) {
      player.booster = await generateRandomBooster(setCode);
      console.log(`Player ${player.name} received a booster:`, player.booster);
    }

  };



  externals.pickCard = function (cardId) {
    let pb = players[7].booster;
    let p = players[7];
    for (var i = 0; i <= pb.length; i++) {
      if (pb[i].id === cardId) {
        p.pickedCards.push(pb[i]);

        console.log(`Player ${p.name} picked card: ${pb[i].name}`);
        p.booster.splice(i, 1);
        break;

      }
    } return botTurn();


  }


  function botTurn() {

    for (let i = 0; i < players.length; i++) {
      if (players[i].id !== '7') {
        botPick(players[i]);

      }

    } passBoosterToNextPlayer();
    console.log("all boosters were passed XDD");
    return players[7].booster;

  }


  function botPick(player) {
    let pickedCard = player.booster.shift()
    player.pickedCards.push(pickedCard);
  }




  function passBoosterToNextPlayer() {
    console.log("pass")


    for (var i = 0; i < players.length; i++) {

      var currentPlayer = players[i];
      var nextPlayer = players[(i + 1) % players.length];
      var tempBooster = currentPlayer.booster;
      currentPlayer.booster = nextPlayer.booster;
      nextPlayer.booster = tempBooster;
      console.log(nextPlayer.name + "got" + players[i].name + players[i].booster);

    }

  }

  externals.getUserPicks = function () {
    return players[7].pickedCards;
  }


  return externals;
});
