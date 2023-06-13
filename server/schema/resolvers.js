require('dotenv').config();

const resolvers = {
  Query: {
    me: async (parent, params, context) => {
      return null;
    },
    api: async (parent, params, context) => {
      const url = 'https://api.igdb.com/v4/games';
      const headers = {
        'Content-Type': 'text/plain',
        'Client-ID': process.env.CLIENT_ID,
        Authorization: 'Bearer ' + process.env.IGBD_AUTH,
      };

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: headers,
          body: 'fields name; limit 10;',
        });

        const data = await response.json();

        console.log('data', data);
      } catch (error) {
        console.log(error);
      }

      return { id: 35004, name: 'Demon Horde Master' };
    },
  },
  Mutation: {
    temp: async (parent, params, context) => {
      return null;
    },
  },
};

module.exports = resolvers;
