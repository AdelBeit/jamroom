import React from "react";

interface Props {
  roomID: string;
  _name: string;
}

export default function StatusBar({ roomID, _name }: Props) {
  const jammingToast = ["spoonypan", "purplepeach23"];
  return (
    <div className="_container">
      {/* <Button _name="menu" />
      <Button _name="tutorial" /> */}
      <div className="now_jamming">
        {/* {jammingToast.map((jammerID) => (
          <JammingToast key={jammerID} id={jammerID} />
        ))} */}
      </div>
      <div className="room_id">
        <span>#{roomID}</span>
      </div>
      <style jsx>{`
        ._container {
          width: 100%;
          height: 30px;
        }
      `}</style>
    </div>
  );
}
