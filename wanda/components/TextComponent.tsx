import React, { useEffect, useState } from 'react'
import { Messages, NewMessageSubscription } from '../src/generated/graphql'

const TextComponent: React.FC<{ messages: Messages[], newMessage?: NewMessageSubscription }> = ({ messages , newMessage }) => {
  let [msg, setMsg] = useState<Messages[]>(messages)

  useEffect(()=> {
     if(typeof newMessage !== "undefined"){
       let neMsg = newMessage.newMessage
       setMsg([ neMsg, ...msg])
     }
  },[newMessage])

  return (
    <div>
        {msg.map(m => <div key={m.id}>{m.message}</div>)}
    </div>
  )
}

export default TextComponent