import { format } from "date-fns";
import UserProfileBox from "@/components/DirectMessages/Components/UserProfileBox";
import ChatInput from "@/components/chat/ChatInput";
import ChatMessages from "@/components/chat/ChatMessages";
import Chatheader from "@/components/chat/Chatheader"
import { MediaRoom } from "@/components/media-room";
import { getCurrentConversation } from "@/lib/conversation";
import { currentProfile } from "@/lib/getCurrentUser";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
interface FriendIdPageProps {
  params: {
    conversationId: string;
  },
  searchParams: {
    video?: boolean;
  }
}

const page = async({params,searchParams}:FriendIdPageProps) => {
  const DATE_FORMAT = "d MMM yyyy";
  const profile = await currentProfile();
  if (!profile) {
    return redirectToSignIn();
  }
  const conversation = await getCurrentConversation(params.conversationId)
  if (!conversation) {
    return redirect(`/channels/me`);
  }
  const { conversationOne,conversationTwo } = conversation;

  const otherFriend:any = conversationOne.id === profile.id ? conversationTwo : conversationOne;
  return (
    <div className=" bg-white  dark:bg-[#313338] flex flex-col h-full">
    <Chatheader
      imageUrl={otherFriend.image as string}
      name={otherFriend.displayName}
      type="conversation"

    />
    {searchParams.video && (
      <MediaRoom
        chatId={conversation.id}
        video={true}
        audio={true}
      />
    )}
    {!searchParams.video && (
      <div className="flex w-full h-[calc(100vh-5px)]">
        <div className="flex-[2]  relative h-[calc(100vh-50px)]">
          <ChatMessages
          currentUser={profile}
            imageUrl={otherFriend.image as string}
            displayName={otherFriend.username as string}
            name={otherFriend.displayName}
            chatId={conversation.id}
            type="conversation"
            apiUrl="/api/direct-messages"
            paramKey="conversationId"
            paramValue={conversation.id}
            socketUrl="/api/socket/direct-messages"
            socketQuery={{
              conversationId: conversation.id,
            }}
          />
          <ChatInput
            name={otherFriend.displayName}
            type="conversation"
            apiUrl="/api/socket/direct-messages"
            query={{
              conversationId: conversation.id,
            }}
          />
        </div>
        <div className="flex">
          <UserProfileBox
          imageUrl={otherFriend?.image as string}
          displayName={otherFriend?.username as string}
          name={otherFriend?.displayName}
          createdAt = {format(new Date(otherFriend.createdAt), DATE_FORMAT)}
          />
        </div>
      </div>
    )}
  </div>
  )
}

export default page