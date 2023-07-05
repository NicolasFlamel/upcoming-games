require('dotenv').config();

const resolvers = {
  Query: {
    me: async (parent, params, context) => {
      return null;
    },
    api: async (parent, params, context) => {
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
          body: 'fields *; where m = 6 & date > 1686695760; sort date asc; limit 50;',
        });
        const upcomingData = await upcomingResponse.json();

        // making array of game ids
        const gameArr = upcomingData.map(({ game }) => game);

        // using ids to get game info
        const gamesResponse = await fetch(gamesURL, {
          method: 'POST',
          headers,
          body:
            'fields id,cover,name,platforms,release_dates,summary; limit 100; where id = (' +
            gameArr.toString() +
            ') & category = (0,8,9,11,12);',
        });
        const gameData = await gamesResponse.json();
        
        const gameDataIds = gameData.map(game => game.id)
        
        const coverResponse = await fetch(coverURL, {
          method: 'POST',
          headers,
          body: 'fields url,game; where game = (' + gameDataIds.toString() + ');',
        });
        const coverData = await coverResponse.json();

        const data = {
          gameData,
          coverData,
        };

        return data;
      } catch (error) {
        console.log(error);
      }
      return { message: 'fetch failed' };
    },
  },
  Mutation: {
    temp: async (parent, params, context) => {
      return null;
    },
  },
};

module.exports = resolvers;
