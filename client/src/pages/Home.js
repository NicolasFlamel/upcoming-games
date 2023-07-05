import { useQuery } from '@apollo/client';
import { QUERY_API } from '../utils/queries';
import Card from 'react-bootstrap/Card';

const Home = () => {
  const { loading, data, error } = useQuery(QUERY_API);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>ERROR {console.log(error)}</h1>;

  const { gameData, coverData } = data.api;

  const gameList = gameData.map((game) => {
    const newGame = { ...game };

    newGame.cover = coverData.find((coverObj) => coverObj.game === game.id);

    return newGame;
  });

  console.log('gamelist', gameList);

  return (
    <section>
      <h1>Welcome!</h1>
      <section>
        <h2>Upcoming Games</h2>
        <article className="upcoming-month">
          <h3>May</h3>
          <ul>
            {gameList.map((game) => (
              <li key={game.id}>
                <Card style={{ width: '18rem' }}>
                  <Card.Img variant="top" src={game.cover?.url} />
                  <Card.Body>
                    <Card.Title>{game.name}</Card.Title>
                    <Card.Text>{game.summary}</Card.Text>
                  </Card.Body>
                </Card>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </section>
  );
};

export default Home;
