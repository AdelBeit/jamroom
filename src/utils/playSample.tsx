import { Sample } from "../sample";
import { User } from "../types";
import { PlayersContext } from "./PlayersContext";
import { useUsers } from "./useUsers";

export default function playSample(
  players: PlayersContext["players"],
  sample: Sample,
  userID: User["id"]
) {
  if (!players) return;
  const { users, userID: currentUser } = useUsers.getState();
  const volume =
    ((users[userID] && users[userID].volume) || users[currentUser].volume) ??
    -10;
  const player = players.player(sample);
  player.volume.value = volume;
  player.start();
}
