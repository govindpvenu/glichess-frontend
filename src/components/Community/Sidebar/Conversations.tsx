import { ScrollArea } from "@/components/ui/scroll-area"
import Conversation from "./Conversation"
import { useGetOtherUsersQuery } from "../../../slices/userApiSlice"

function Conversations() {
    const { data: conversations, error, isLoading } = useGetOtherUsersQuery({})
    console.log("CONVERSATION:", conversations)
    console.log("Error:", error)
    return (
        <ScrollArea className="h-[86vh] rounded-md border p-1">
            {isLoading ? (
                <span className="loading loading-spinner mx-auto">Loading</span>
            ) : (
                <>
                    {conversations.map((conversation: any) => (
                        <Conversation key={conversation._id} conversation={conversation} />
                    ))}
                </>
            )}
        </ScrollArea>
    )
}

export default Conversations
