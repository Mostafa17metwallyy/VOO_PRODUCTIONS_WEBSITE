import AchievementsSection from "../components/AchievementsSection";
import TeamSection from "../components/TeamSection";
import TimelineSection from "../components/TimelineSection";
import WhoAreWeSection from "../components/WhoAreWeSection";
import WhoWeAreIntro from "../components/WhoWeAreIntro";

export default function WhoWeArePage() {
  return (
    <>
      <WhoWeAreIntro />
      <WhoAreWeSection/>
      <TimelineSection/>
      <TeamSection/>
      <AchievementsSection/>
    </>
  );
}
