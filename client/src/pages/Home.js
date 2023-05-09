import { useQuery } from '@apollo/client';
import { QUERY_API } from '../utils/queries';

const Home = () => {
  const { loading, data, error } = useQuery(QUERY_API);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>ERROR</h1>;

  console.log(data);

  return (
    <section>
      <h1>Welcome!</h1>
      <section>
        <h2>Upcoming Games</h2>
        <h3>May</h3>
        <ul></ul>
      </section>
    </section>
  );
};

export default Home;
