import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useDispatch, useSelector } from "react-redux"
import { setSelectedConversation } from "../../../slices/userSlice"
import type { RootState } from "../../../store"

function Conversation({ conversation }: any) {
    const dispatch = useDispatch()
    const { selectedConversation } = useSelector((state: RootState) => state.user)
    const isSelected = (selectedConversation as any)?._id === conversation._id
    return (
        <div className="flex rounded-md items-center gap-4 my-1 py-2 px-2 bg-card" onClick={() => dispatch(setSelectedConversation(conversation))}>
            <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarImage alt="?" src={conversation.profile} />
                <AvatarFallback>{conversation?.username[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="grid gap-2">
                {isSelected ? <p className="text-lg font-medium leading-none">{conversation.username}</p> : <p className="text-sm font-medium leading-none">{conversation.username}</p>}
                {/* <p className="text-sm text-muted-foreground">last message </p> */}
            </div>
            {/* <div className="ml-auto font-medium">0</div> */}
        </div>
    )
}

export default Conversation
