'use client'
import ServerChannel from './ServerChannel'
import ServerSection from './Server-Section'
import { Channel, ChannelType, Member, MemberRole, User } from '@prisma/client'
import { ServerWithMembersWithProfiles } from '@/types'
import { useChannelSocket } from '@/hooks/use-channel-socket'
import { useChannelsQuery } from '@/hooks/use-channel-query'
import { useEffect } from 'react'
import ServerMember from './ServerMember'
type MembersWithProfile = Member & {
    Profile: User
}[]
interface ServerChannelsProps {
    textChannels: Channel[] | undefined
    audioChannels: Channel[] | undefined
    videoChannels: Channel[] | undefined
    server: ServerWithMembersWithProfiles
    role: MemberRole | undefined
    apiUrl: string
    profileId: string
    members: any
}
const ServerChannels = ({
    audioChannels: audioChannelsFromSideBar,
    role,
    server,
    textChannels: textChannelsFromSideBar,
    videoChannels: videoChannelsFromSideBar,
    apiUrl,
    profileId,
    members: MembersFromSideBar
}: ServerChannelsProps) => {
    const channelKey = `server:${server.id}:channel`;
    const queryKey = `server:${server.id}`;
    const channelupdatekey = `server:${server.id}:channel:update`;
    const { data } = useChannelsQuery({
        apiUrl,
        queryKey,
        serverId: server.id
    });
    if (data) {
        textChannelsFromSideBar = data?.channels.filter(
            (channel: Channel) => channel.type === ChannelType.TEXT
        );
        audioChannelsFromSideBar = data?.channels.filter(
            (channel: Channel) => channel.type === ChannelType.AUDIO
        );
        videoChannelsFromSideBar = data?.channels.filter(
            (channel: Channel) => channel.type === ChannelType.VIDEO
        );
        MembersFromSideBar = data?.members.filter(
            (member: any) => member.userId !== profileId
        );
    }

    const { audioChannels, textChannels, videoChannels, members } = useChannelSocket({ channelKey, channelupdatekey, profileId });

    return (
        <>
            {
                !!textChannels?.length ? (
                    <>
                        <div className="mb-2">
                            <ServerSection
                                sectionType="channels"
                                channelType={ChannelType.TEXT}
                                role={role}
                                label="Text Channels"
                                server={server}
                                socketUrl="/api/socket/create-channels"
                                socketQuery={{
                                    serverId: server.id,
                                }}
                            />
                            <div className="space-y-[2px]">
                                {textChannels?.map((channel: Channel) => (
                                    <ServerChannel
                                        key={channel.id}
                                        channel={channel}
                                        role={role}
                                        server={server}
                                        socketUrl="/api/socket/create-channels"
                                        socketQuery={{
                                            serverId: server.id,
                                            channelId: channel.id
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </>
                )
                    :
                    (
                        !!textChannelsFromSideBar?.length &&
                        <>
                            <div className="mb-2">
                                <ServerSection
                                    sectionType="channels"
                                    channelType={ChannelType.TEXT}
                                    role={role}
                                    label="Text Channels"
                                    server={server}
                                    socketUrl="/api/socket/create-channels"
                                    socketQuery={{
                                        serverId: server.id,
                                    }}
                                />
                                <div className="space-y-[2px]">
                                    {textChannelsFromSideBar?.map((channel: Channel) => (
                                        <ServerChannel
                                            key={channel.id}
                                            channel={channel}
                                            role={role}
                                            server={server}
                                            socketUrl="/api/socket/create-channels"
                                            socketQuery={{
                                                serverId: server.id,
                                                channelId: channel.id
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </>
                    )
            }

            {
                !!audioChannels?.length ? (
                    <>
                        <div className="mb-2">
                            <ServerSection
                                sectionType="channels"
                                channelType={ChannelType.AUDIO}
                                role={role}
                                label="Voice Channels"
                                server={server}
                                socketUrl="/api/socket/create-channels"
                                socketQuery={{
                                    serverId: server.id,
                                }}
                            />
                            <div className="space-y-[2px]">
                                {audioChannels?.map((channel: Channel) => (
                                    <ServerChannel
                                        key={channel.id}
                                        channel={channel}
                                        role={role}
                                        server={server}
                                        socketUrl="/api/socket/create-channels"
                                        socketQuery={{
                                            serverId: server.id,
                                            channelId: channel.id
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </>
                ) :
                    (
                        !!audioChannelsFromSideBar?.length &&
                        <>
                            <div className="mb-2">
                                <ServerSection
                                    sectionType="channels"
                                    channelType={ChannelType.AUDIO}
                                    role={role}
                                    label="Voice Channels"
                                    server={server}
                                    socketUrl="/api/socket/create-channels"
                                    socketQuery={{
                                        serverId: server.id,
                                    }}
                                />
                                <div className="space-y-[2px]">
                                    {audioChannelsFromSideBar?.map((channel: Channel) => (
                                        <ServerChannel
                                            key={channel.id}
                                            channel={channel}
                                            role={role}
                                            server={server}
                                            socketUrl="/api/socket/create-channels"
                                            socketQuery={{
                                                serverId: server.id,
                                                channelId: channel.id
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </>
                    )
            }
            {!!videoChannels?.length ?
                (
                    <>
                        <div className="mb-2">
                            <ServerSection
                                sectionType="channels"
                                channelType={ChannelType.VIDEO}
                                role={role}
                                label="Video Channels"
                                server={server}
                                socketUrl="/api/socket/create-channels"
                                socketQuery={{
                                    serverId: server.id,
                                }}
                            />
                            <div className="space-y-[2px]">
                                {videoChannels?.map((channel: Channel) => (
                                    <ServerChannel
                                        key={channel.id}
                                        channel={channel}
                                        role={role}
                                        server={server}
                                        socketUrl="/api/socket/create-channels"
                                        socketQuery={{
                                            serverId: server.id,
                                            channelId: channel.id
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </>

                )
                : (!!videoChannelsFromSideBar?.length &&
                    <>
                        <div className="mb-2">
                            <ServerSection
                                sectionType="channels"
                                channelType={ChannelType.VIDEO}
                                role={role}
                                label="Video Channels"
                                server={server}
                                socketUrl="/api/socket/create-channels"
                                socketQuery={{
                                    serverId: server.id,
                                }}
                            />
                            <div className="space-y-[2px]">
                                {videoChannelsFromSideBar?.map((channel: Channel) => (
                                    <ServerChannel
                                        key={channel.id}
                                        channel={channel}
                                        role={role}
                                        server={server}
                                        socketUrl="/api/socket/create-channels"
                                        socketQuery={{
                                            serverId: server.id,
                                            channelId: channel.id
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </>
                )
            }
            {!!members?.length ? (
                <div className="mb-2">
                    <ServerSection
                        sectionType="members"
                        role={role}
                        label="Members"
                        server={server}
                    />
                    <div className="space-y-[2px]">
                        {members.map((member: any) => (
                            <ServerMember
                                key={member.id}
                                member={member}
                                server={server}
                            />
                        ))}
                    </div>
                </div>
            ) :
                (!!MembersFromSideBar.length &&

                    <div className="mb-2">
                        <ServerSection
                            sectionType="members"
                            role={role}
                            label="Members"
                            server={server}
                        />
                        <div className="space-y-[2px]">
                            {MembersFromSideBar?.map((member: any) => (
                                <ServerMember
                                    key={member.id}
                                    member={member}
                                    server={server}
                                />
                            ))}
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default ServerChannels