import Head from 'next/head'
import { FormEvent, useState } from 'react'
import TextComponent from '../components/TextComponent'
import { useCreateMessageMutation, useMessagesQuery, useNewMessageSubscription } from '../src/generated/graphql'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [message, setMessage] = useState('')
  const [{ data, error, fetching }] = useMessagesQuery()
  const [{ data: newMessage }] = useNewMessageSubscription()
  const [, createMessage] = useCreateMessageMutation()

  if(fetching) return <div>Loading...</div>

  if(error) return <div>{error.message}</div>

  const handleSubmit = async(e: FormEvent) => {
    e.preventDefault()
    if(!message) return

    await createMessage({ message })
    setMessage('')
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

       <h1>Hello</h1>

       <form onSubmit={handleSubmit}>
          <input type="text" name="message" value={message} onChange={e => setMessage(e.target.value)} />
          <button>post</button>
       </form>

       <div>
         { data?.messages ? <TextComponent messages={data.messages} newMessage={newMessage} /> : null}
       </div>

    </div>
  )
}
