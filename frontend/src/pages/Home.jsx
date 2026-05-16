import Browse from '../components/Browse'
import RecentItems from '../components/RecentItems';
import Hero from './Hero';
import SuccessStories from '../components/SuccessStories';

const Home = () => {
  return (
    <>
      <Hero />
      <Browse />
      <RecentItems />
      <SuccessStories />
    </>
  );
};

export default Home;
