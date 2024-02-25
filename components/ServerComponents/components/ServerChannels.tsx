'use client'
import React, { useEffect, useState } from 'react'
import ServerChannel from './ServerChannel'
import ServerSection from './Server-Section'
import { Channel, ChannelType, MemberRole } from '@prisma/client'
import { ServerWithMembersWithProfiles } from '@/types'
import { useChannelSocket } from '@/hooks/use-channel-socket'

interface ServerChannelsProps {
    textChannels: Channel[] | undefined
    audioChannels: Channel[] | undefined
    videoChannels: Channel[] | undefined
    server: ServerWithMembersWithProfiles
    role: MemberRole | undefined
}
const ServerChannels = ({
    audioChannels: audioChannelsFromSideBar,
    role,
    server,
    textChannels: textChannelsFromSideBar,
    videoChannels: videoChannelsFromSideBar
}: ServerChannelsProps) => {
    const channelKey = `server:${server.id}:channel`;
    const channelupdatekey = `server:${server.id}:channel:update`;
    const { audioChannels, textChannels, videoChannels } = useChannelSocket({ channelKey,channelupdatekey });
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
                : ( !!videoChannelsFromSideBar?.length &&
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
        </>
    )
}

export default ServerChannels