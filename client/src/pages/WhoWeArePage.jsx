import AchievementsSection from "../components/AchievementsSection";
import TimelineSection from "../components/TimelineSection";
import WhoAreWeSection from "../components/WhoAreWeSection";
import WhoWeAreIntro from "../components/WhoWeAreIntro";

export default function WhoWeArePage() {
  return (
    <>
      <WhoWeAreIntro />
      <WhoAreWeSection/>
      <TimelineSection/>
      <AchievementsSection/>
    </>
  );
}
