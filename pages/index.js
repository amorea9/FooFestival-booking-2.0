import Splash from "../components/Splash";
import Lineup from "../components/Lineup";
import Headliners from "../components/Headliners";

export default function Home(props) {
  return (
    <>
      <Splash />
      <Headliners />
      <Lineup bandsPlaying={props.bandsPlaying} />
    </>
  );
}
