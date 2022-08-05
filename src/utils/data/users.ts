import { Instrument } from "../../types";
const users2 = { 'abc': ['wolf', 'keys', 100], 'def': ['bunny', 'keys', 100], 'ghi': ['peach', 'drums', 42] }
const users: {
  userID: string;
  instrument: Instrument;
  ip: string;
  socket: string;
}[] = [
    { userID: "ShoeStore2321", instrument: "keys", ip: "", socket: "" },
    { userID: "SprinkleDonut11", instrument: "drums", ip: "", socket: "" },
    { userID: "PhoneBooth028", instrument: "keys", ip: "", socket: "" },
    { userID: "NightWing", instrument: "drums", ip: "", socket: "" },
  ];
export default users;
