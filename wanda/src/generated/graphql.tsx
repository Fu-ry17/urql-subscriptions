import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Messages = {
  __typename?: 'Messages';
  id: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createMessage: Messages;
};


export type MutationCreateMessageArgs = {
  message: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  messages: Array<Messages>;
};

export type Subscription = {
  __typename?: 'Subscription';
  newMessage: Messages;
};

export type CreateMessageMutationVariables = Exact<{
  message: Scalars['String'];
}>;


export type CreateMessageMutation = { __typename?: 'Mutation', createMessage: { __typename?: 'Messages', id: string, message: string } };

export type MessagesQueryVariables = Exact<{ [key: string]: never; }>;


export type MessagesQuery = { __typename?: 'Query', messages: Array<{ __typename?: 'Messages', id: string, message: string }> };

export type NewMessageSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewMessageSubscription = { __typename?: 'Subscription', newMessage: { __typename?: 'Messages', id: string, message: string } };


export const CreateMessageDocument = gql`
    mutation CreateMessage($message: String!) {
  createMessage(message: $message) {
    id
    message
  }
}
    `;

export function useCreateMessageMutation() {
  return Urql.useMutation<CreateMessageMutation, CreateMessageMutationVariables>(CreateMessageDocument);
};
export const MessagesDocument = gql`
    query Messages {
  messages {
    id
    message
  }
}
    `;

export function useMessagesQuery(options?: Omit<Urql.UseQueryArgs<MessagesQueryVariables>, 'query'>) {
  return Urql.useQuery<MessagesQuery, MessagesQueryVariables>({ query: MessagesDocument, ...options });
};
export const NewMessageDocument = gql`
    subscription NewMessage {
  newMessage {
    id
    message
  }
}
    `;

export function useNewMessageSubscription<TData = NewMessageSubscription>(options: Omit<Urql.UseSubscriptionArgs<NewMessageSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<NewMessageSubscription, TData>) {
  return Urql.useSubscription<NewMessageSubscription, TData, NewMessageSubscriptionVariables>({ query: NewMessageDocument, ...options }, handler);
};