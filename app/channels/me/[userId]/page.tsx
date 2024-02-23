import UserBody from "@/components/DirectMessages/Components/UserBody"
import Chatheader from "@/components/chat/Chatheader"
import { MediaRoom } from "@/components/media-room";
import { getOrCreateConversation } from "@/lib/conversation";
import { currentProfile } from "@/lib/getCurrentUser";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
interface FriendIdPageProps {
  params: {
    userId: string;
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
  const conversation = await getOrCreateConversation(profile.id, params.userId);
  if (!conversation) {
    return redirect(`/channels/me`);
  }
  return (
    <div className='ml-[15rem] w-full h-full '>
      <Chatheader
      name="kritam"
      userId="123456789"
      type="conversation"
      imageUrl="https://github.com/shadcn.png"
      />
       {searchParams.video ? (
        <MediaRoom
        // dyanmic value should provided
          chatId={"12345678965465"}
          video={true}
          audio={true}
        />
      )
    :
       <UserBody/>
    }
    </div>
  )
}

export default page