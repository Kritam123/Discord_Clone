import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { format } from "date-fns";
import { db } from "@/lib/db";
import { MediaRoom } from "@/components/media-room";
import { currentProfile } from "@/lib/getCurrentUser";
import Chatheader from "@/components/chat/Chatheader";
import ChatMessages from "@/components/chat/ChatMessages";
import ChatInput from "@/components/chat/ChatInput";
import { getOrCreateConversation } from "@/lib/conversation";
import UserProfileBox from "@/components/DirectMessages/Components/UserProfileBox";

interface MemberIdPageProps {
  params: {
    memberId: string;
    serverId: string;
  },
  searchParams: {
    video?: boolean;
  }
}
const DATE_FORMAT = "d MMM yyyy";
const MemberIdPage = async ({
  params,
  searchParams,
}: MemberIdPageProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const currentMember = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      userId: profile.id,
    },
    include: {
      profile: true,
    },
  });

  if (!currentMember) {
    return redirect("/");
  }

  const conversation = await getOrCreateConversation(currentMember.id, params.memberId);

  if (!conversation) {
    return redirect(`/servers/${params.serverId}`);
  }

  const { memberOne, memberTwo } = conversation;

  const otherMember = memberOne.userId === profile.id ? memberTwo : memberOne;

  return (
    <div className=" bg-white dark:bg-[#313338] flex flex-col h-full">
      <Chatheader
        imageUrl={otherMember.profile.image as string}
        name={otherMember.profile.displayName}
        serverId={params.serverId}
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
        <div className="flex w-full  h-[calc(100vh-5px)]">
          <div className="flex-[2]  relative h-[calc(100vh-50px)]">
            <ChatMessages
              member={currentMember}
              imageUrl={otherMember.profile.image as string}
              displayName={otherMember.profile.username as string}
              name={otherMember.profile.displayName}
              chatId={conversation.id}
              type="conversation"
              apiUrl="/api/member-messages"
              paramKey="conversationId"
              paramValue={conversation.id}
              socketUrl="/api/socket/member-messages"
              socketQuery={{
                conversationId: conversation.id,
              }}
            />
            <ChatInput
              name={otherMember.profile.displayName}
              type="conversation"
              apiUrl="/api/socket/member-messages"
              query={{
                conversationId: conversation.id,
              }}
            />
          </div>
          <div className="flex">
            <UserProfileBox
            imageUrl={otherMember.profile.image as string}
            displayName={otherMember.profile.username as string}
            name={otherMember.profile.displayName}
            createdAt = {format(new Date(otherMember.createdAt), DATE_FORMAT)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default MemberIdPage;