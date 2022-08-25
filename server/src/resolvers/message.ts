import { Arg, Ctx, Field, Mutation, ObjectType, PubSub, PubSubEngine, Query, Resolver, Root, Subscription } from "type-graphql";
import { randomUUID } from 'crypto'
import { Request } from "express"

@ObjectType()
class Messages{
    @Field(()=> String)
    id!: string

    @Field(()=> String)
    message!: string
}

const topics = {
    NEW_MESSAGE: "NEW_MESSAGE"
}
 
type MyContext = {
   req: Request
}

const messageArr: Messages[] = [ { id: randomUUID(), message: "so cool"}]

@Resolver()
export class MessageResolver{
    @Query(()=> [Messages])
    messages(){
       return messageArr
    }

    @Mutation(()=> Messages)
    createMessage(@Arg('message') message: string, @PubSub() pubsub: PubSubEngine){
       let newMessage = { id: randomUUID(), message }
       messageArr.unshift(newMessage)
       pubsub.publish(topics.NEW_MESSAGE, newMessage)
       return newMessage
    }

    @Subscription(()=> Messages, { topics: topics.NEW_MESSAGE })
    newMessage(@Root() message: Messages, @Ctx() ctx: MyContext){
        return message
    }

}