import { useEffect } from "react"
import { useTimer } from "react-timer-hook"
import { Button } from "../../ui/button"

export default function Timer({ expiryTimestamp, state }: any) {
    const { seconds, minutes, pause, resume } = useTimer({ 
        expiryTimestamp, 
        autoStart: false,
        onExpire: () => console.warn("onExpire called") 
    })
    
    useEffect(() => {
        if (state) {
            resume()
        } else {
            pause()
        }
    }, [state, pause, resume])

    const formattedMinutes = String(minutes).padStart(2, '0')
    const formattedSeconds = String(seconds).padStart(2, '0')

    return (
        <Button variant={"secondary"}>
            <div style={{ fontSize: "20px" }}>
                <span>{formattedMinutes}</span>:<span>{formattedSeconds}</span>
            </div>
        </Button>
    )
}
