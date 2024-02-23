import React from "react";
import HeaderPart from "./messagePart/HeaderPart";
import MessagesContainer from "./messagePart/MessagesContainer";
import ChatInput from "@/components/chat/ChatInput";

const MessagesBox = () => {
  return <div className="bg-[#313338] h-[calc(100vh - 3rem)] flex flex-col justify-between  w-full ">
    <div className="overflow-y-scroll  scrollHidden h-full">
      {/* <HeaderPart  /> */}
      <MessagesContainer />
    </div>
    <ChatInput
      apiUrl="kritma"
      name="friends"
      query={["dsfdf", "sdfdf"]}
      type="Friends"
    />
  </div>;
};

export default MessagesBox;
