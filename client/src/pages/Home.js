import { useQuery } from '@apollo/client';
import { QUERY_UPCOMING } from '../utils/queries';
import Card from 'react-bootstrap/Card';

const Home = () => {
  const { loading, data, error } = useQuery(QUERY_UPCOMING);

  const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(
    new Date()
  );

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>ERROR {console.log(error)}</h1>;

  const { upcoming } = data;

  console.log(upcoming);

  const handleImgUrl = (url) => {
    if (!url) return 'https://placehold.co/400?text=No+Image+Found';
    return url.replace('/t_thumb', '/t_cover_big');
  };

  return (
    <section>
      <h1>Welcome!</h1>
      <section>
        <article className="upcoming-month">
          <h2>{month}</h2>
          <ul>
            {upcoming.map((game) => (
              <li key={game.id}>
                <Card
                  style={{
                    width: '18rem',
                    height: '36rem',
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={handleImgUrl(game.game?.cover?.url)}
                  />
                  <Card.Title>{game.game?.name}</Card.Title>
                  <Card.Body>
                    <Card.Text>
                      {game.game?.summary || 'No Summary Found'}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    Release Date: {new Date(game.date * 1000).toDateString()}
                  </Card.Footer>
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
