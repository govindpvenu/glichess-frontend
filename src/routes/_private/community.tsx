import { createFileRoute } from "@tanstack/react-router"
export const Route = createFileRoute("/_private/community")({
    component: Community,
})
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"

import { NoChatSelected } from "@/components/Community/ChatArea/NoChatSelected"

import type { RootState } from "../../store"
import { useSelector } from "react-redux"
import Conversations from "@/components/Community/Sidebar/Conversations"
import MessageContainer from "@/components/Community/ChatArea/MessageContainer"
import Sidebar from "@/components/Community/Sidebar/SidebarHeader"

function Community() {
    const { selectedConversation } = useSelector((state: RootState) => state.user)
    return (
        <ResizablePanelGroup direction="horizontal" className="max-w-full rounded-lg border">
            <ResizablePanel defaultSize={30}>
                <Sidebar />
                <Conversations />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={70}>
                {!selectedConversation ? (
                    <NoChatSelected />
                ) : (
                    <div className="flex h-full min-h-[93vh] flex-col bg-muted/50 lg:col-span-2">
                        <MessageContainer />
                    </div>
                )}
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}
