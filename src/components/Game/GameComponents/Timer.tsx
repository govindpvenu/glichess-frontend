import { useEffect } from "react"
import { useTimer } from "react-timer-hook"
import { Button } from "../../ui/button"

export default function Timer({ expiryTimestamp, state }: any) {
    const { seconds, minutes, pause, resume } = useTimer({ expiryTimestamp, onExpire: () => console.warn("onExpire called") })
    useEffect(() => {
        if (state) {
            resume()
        } else {
            pause()
        }
    }, [state, pause, resume])

    return (
        <Button variant={"secondary"}>
            <div style={{ fontSize: "20px" }}>
                <span>{minutes}</span>:<span>{seconds}</span>
            </div>
        </Button>
    )
}

{
    /* <p>{isRunning ? 'Running' : 'Not running'}</p>
      <button onClick={start}>Start</button>
      <button onClick={pause}>Pause</button>
      <button onClick={resume}>Resume</button>
      <button onClick={() => {
        // Restarts to 5 minutes timer
        const time = new Date();
        time.setSeconds(time.getSeconds() + 300);
        restart(time)
      }}>Restart</button> */
}
