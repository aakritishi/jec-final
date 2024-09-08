import ImageSlider from "./ImageSlider";
import { IntroductionSection } from "./IntroductionSection";
import Updates from "./Updates";
import Events from "./Events/Events";
import AboutUniversity from "./AboutUniversity";
import Course from "./Course";
import Cardslider from "./Cardslider";
import LatestUpdate from "./LatestUpdate";

export const Home = () => {
  return (
    <div className="w-[94%] mx-auto">
      <IntroductionSection />
      <Updates />
      <LatestUpdate />
      <Events />
      <AboutUniversity />
      <ImageSlider />
      <Course />
    </div>
  );
};
export default Home;
