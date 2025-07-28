"use client";

import { Chat, useJoinUrl } from "react-together";

export default function ArtistsChat() {
  const joinUrl = useJoinUrl();

  return (
    <>
      {joinUrl ? (
        <div className="fixed bottom-0 right-0 text-black z-50">
          <Chat
            hideWhenDisconnected={true}
            rtKey="colorcanvas"
            chatName="Artists Chat"
          />
        </div>
      ) : (
        ""
      )}
    </>
  );
}
