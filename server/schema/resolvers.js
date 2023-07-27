require('dotenv').config();

const resolvers = {
  Query: {
    me: async (parent, params, context) => {
      return null;
    },
    // upcoming api
    upcoming: async (parent, { date }, context) => {
      let upcomingData, gameData, coverData;
      const upcomingURL = 'https://api.igdb.com/v4/release_dates';
      const gamesURL = 'https://api.igdb.com/v4/games';
      const coverURL = 'https://api.igdb.com/v4/covers';
      const headers = {
        'Content-Type': 'text/plain',
        'Client-ID': process.env.CLIENT_ID,
        Authorization: 'Bearer ' + process.env.IGBD_AUTH,
      };

      try {
        // finds up coming games
        const upcomingResponse = await fetch(upcomingURL, {
          method: 'POST',
          headers,
          body: 'fields id,date,region,game; where date > 1688774133 & region = (2,8); sort date asc; limit 500;',
        });
        upcomingData = await upcomingResponse.json();
      } catch (error) {
        console.log(error);
        return { message: 'fetch failed' };
      }

      // filter out duplicate games
      const upcomingFilteredGames = upcomingData.filter(
        (upcomingGame, index) => {
          const findGame = upcomingData.find(
            (game) => game.game == upcomingGame.game
          );
          return findGame === upcomingGame;
        }
      );

      //  array of game ids for filtered games
      const filteredGameIds = upcomingFilteredGames.map(({ game }) => game);

      try {
        // using ids to get game info & covers
        const gamesResponse = await fetch(gamesURL, {
          method: 'POST',
          headers,
          body:
            'fields id,cover,name,platforms,release_dates,summary; limit 100; where id = (' +
            filteredGameIds.toString() +
            ') & category = (0,8,9) & total_rating_count > 1;',
        });
        gameData = await gamesResponse.json();

        // array of ids for games
        const gameDataIds = gameData.map(({ id }) => id);

        const coverResponse = await fetch(coverURL, {
          method: 'POST',
          headers,
          body:
            'fields url,game; limit 100; where game = (' +
            gameDataIds.toString() +
            ');',
        });

        coverData = await coverResponse.json();
      } catch (error) {
        console.log(error);
        return { message: 'fetch failed' };
      }

      // merge games/covers
      const upcomingGames = gameData.map((singleGame) => {
        // get upcoming data
        const upcomingDataObj = upcomingFilteredGames.find(
          (obj) => obj.game == singleGame.id
        );
        // creates new object merging upcoming data and game data
        const newGameObj = { ...upcomingDataObj, game: { ...singleGame } };
        // merges cover data into new object
        newGameObj.game.cover = coverData.find(
          (cover) => cover.id == singleGame.cover
        );

        return newGameObj;
      });

      return upcomingGames;
    },
    game: async (parent, { upcomingData }, context) => {
      const gamesURL = 'https://api.igdb.com/v4/games';
      const headers = {
        'Content-Type': 'text/plain',
        'Client-ID': process.env.CLIENT_ID,
        Authorization: 'Bearer ' + process.env.IGBD_AUTH,
      };

      try {
        // making array of game ids
        const gameArr = upcomingData.map(({ game }) => game);

        // using ids to get game info
        const gamesResponse = await fetch(gamesURL, {
          method: 'POST',
          headers,
          body:
            'fields id,cover,name,platforms,release_dates,summary; limit 100; where id = (' +
            gameArr.toString() +
            ') & category = (0,8,9) & total_rating_count > 1;',
        });
        const gameData = await gamesResponse.json();

        return gameData;
      } catch (error) {
        console.log(error);

        return { message: 'fetch failed' };
      }
    },
  },
  Mutation: {
    temp: async (parent, params, context) => {
      return null;
    },
  },
};

module.exports = resolvers;
