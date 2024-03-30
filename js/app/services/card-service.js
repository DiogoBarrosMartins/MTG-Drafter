define(function () {
  let externals = {};

  externals.getRandomCard = function (callbackFunction) {
    fetch("https://api.scryfall.com/cards/random")
      .then((response) => response.json())

      .then(function (response) {
        return {
          name: response.name,
          card: response.image_uris.normal,
          flavour: response.flavor_text,
          art: response.image_uris.art_crop,
        };
      })
      .then(function (card) {
        callbackFunction(card);
      });
  };

  externals.getCardDetailsByName = async function (searchInput) {
    try {
      const response = await fetch(
        `https://api.scryfall.com/cards/search?q="${encodeURIComponent(
          searchInput
        )}"`
      );
      const data = await response.json();
      if (!data.data || data.data.length === 0) {
        throw new Error("No cards found");
      }

      let firstMatch = data.data[0];

      return {
        name: firstMatch.name,
        id: firstMatch.id,
        card: firstMatch.image_uris
          ? firstMatch.image_uris.normal
          : firstMatch.card_faces[0].image_uris.normal,
        flavour: firstMatch.flavor_text,
        art: firstMatch.image_uris ? firstMatch.image_uris.art_crop : undefined,
      };
    } catch (error) {
      console.error("Error fetching card details:", error);
      throw error;
    }
  };

  externals.getCardsByString = async function (searchInput) {
    const response = await fetch(
      `https://api.scryfall.com/cards/search?q=${searchInput}`
    );
    const data = await response.json();

    if (!Array.isArray(data.data)) {
      throw new Error("Expected an array of cards");
    }

    const processedCards = data.data.map((element) => ({
      name: element.name,
      id: element.id,
      card: element.image_uris
        ? element.image_uris.normal
        : element.card_faces[0].image_uris.normal,
    }));

    return processedCards;
  };

  externals.openBooster = async function (callbackFunction) {
    const data = await fetch(
      "https://api.scryfall.com/cards/search?q=r>=rare+e:dmu"
    )
      .then((response) => response.json())
      .then(function (response) {
        return response.data.map(function (element) {
          console.log(element);
          return {
            name: element.name,
            id: element.id,
            card: element.image_uris
              ? element.image_uris.normal
              : element.card_faces[0].image_uris.normal,
          };
        });
      })
      .then(function (card) {
        callbackFunction(card);
      });
  };

  externals.generateRandomBooster = async function (setCode, callbackFunction) {
    // Fetch all cards from the set
    const response = await fetch(
      `https://api.scryfall.com/cards/search?q=set:${setCode}`
    )
      .then((response) => response.json())
      .then((response) => response.data);

    const cards = response.map((element) => {
      return {
        name: element.name,
        id: element.id,
        card: element.image_uris
          ? element.image_uris.normal
          : element.card_faces[0].image_uris.normal,
        rarity: element.rarity,
        color: element.color,
      };
    });

    const rareMythic = cards.filter(
      (card) => card.rarity === "rare" || card.rarity === "mythic"
    );
    const uncommons = cards.filter((card) => card.rarity === "uncommon");
    const commons = cards.filter(
      (card) =>
        card.rarity === "common" &&
        card.name.toLowerCase() !== "forest" &&
        card.name.toLowerCase() !== "island" &&
        card.name.toLowerCase() !== "swamp" &&
        card.name.toLowerCase() !== "mountain" &&
        card.name.toLowerCase() !== "plains"
    );
    const booster = [];
    if (rareMythic.length > 0) {
      booster.push(rareMythic[Math.floor(Math.random() * rareMythic.length)]);
    } else {
      booster.push(commons[Math.floor(Math.random() * commons.length)]);
    }

    for (let i = 0; i < 3; i++) {
      booster.push(uncommons[Math.floor(Math.random() * uncommons.length)]);
    }

    for (let i = 0; i < 11; i++) {
      booster.push(commons[Math.floor(Math.random() * commons.length)]);
    }

    callbackFunction(booster);
  };

  externals.generate8RandomBoosters = function (setCode) {
    const boosters = [];
    for (let i = 0; i < 8; i++) {
      externals.generateRandomBooster(setCode, (booster) => {
        boosters.push(booster);
      });
    }
    return boosters;
  };

  return externals;
});
