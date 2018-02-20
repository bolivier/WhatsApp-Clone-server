export type Maybe<T> = T | undefined | null;

export enum MessageType {
  Location = "LOCATION",
  Text = "TEXT",
  Picture = "PICTURE"
}

export type Date = any;

// ====================================================
// Scalars
// ====================================================

// ====================================================
// Types
// ====================================================

export interface Query {
  me?: Maybe<User>;

  users?: Maybe<User[]>;

  chats: Chat[];

  chat?: Maybe<Chat>;
}

export interface User {
  id: string;

  name?: Maybe<string>;

  picture?: Maybe<string>;

  phone?: Maybe<string>;
}

export interface Chat {
  id: string;

  createdAt: Date;

  name?: Maybe<string>;

  picture?: Maybe<string>;

  allTimeMembers: User[];

  listingMembers: User[];

  actualGroupMembers?: Maybe<User[]>;

  admins?: Maybe<User[]>;

  owner?: Maybe<User>;

  isGroup: boolean;

  messages: (Maybe<Message>)[];

  lastMessage?: Maybe<Message>;

  updatedAt: Date;

  unreadMessages: number;
}

export interface Message {
  id: string;

  sender: User;

  chat: Chat;

  content: string;

  createdAt: Date;

  type: number;

  holders: User[];

  ownership: boolean;

  recipients: Recipient[];
}

export interface Recipient {
  user: User;

  message: Message;

  chat: Chat;

  receivedAt?: Maybe<Date>;

  readAt?: Maybe<Date>;
}

export interface Mutation {
  updateUser: User;

  addChat?: Maybe<Chat>;

  addGroup?: Maybe<Chat>;

  updateGroup?: Maybe<Chat>;

  removeChat?: Maybe<string>;

  addMessage?: Maybe<Message>;

  removeMessages?: Maybe<(Maybe<string>)[]>;

  addMembers?: Maybe<(Maybe<string>)[]>;

  removeMembers?: Maybe<(Maybe<string>)[]>;

  addAdmins?: Maybe<(Maybe<string>)[]>;

  removeAdmins?: Maybe<(Maybe<string>)[]>;

  setGroupName?: Maybe<string>;

  setGroupPicture?: Maybe<string>;

  markAsReceived?: Maybe<boolean>;

  markAsRead?: Maybe<boolean>;
}

// ====================================================
// Arguments
// ====================================================

export interface ChatQueryArgs {
  chatId: string;
}
export interface MessagesChatArgs {
  amount?: Maybe<number>;
}
export interface UpdateUserMutationArgs {
  name?: Maybe<string>;

  picture?: Maybe<string>;
}
export interface AddChatMutationArgs {
  userId: string;
}
export interface AddGroupMutationArgs {
  userIds: string[];

  groupName: string;

  groupPicture?: Maybe<string>;
}
export interface UpdateGroupMutationArgs {
  chatId: string;

  groupName?: Maybe<string>;

  groupPicture?: Maybe<string>;
}
export interface RemoveChatMutationArgs {
  chatId: string;
}
export interface AddMessageMutationArgs {
  chatId: string;

  content: string;
}
export interface RemoveMessagesMutationArgs {
  chatId: string;

  messageIds?: Maybe<(Maybe<string>)[]>;

  all?: Maybe<boolean>;
}
export interface AddMembersMutationArgs {
  groupId: string;

  userIds: string[];
}
export interface RemoveMembersMutationArgs {
  groupId: string;

  userIds: string[];
}
export interface AddAdminsMutationArgs {
  groupId: string;

  userIds: string[];
}
export interface RemoveAdminsMutationArgs {
  groupId: string;

  userIds: string[];
}
export interface SetGroupNameMutationArgs {
  groupId: string;
}
export interface SetGroupPictureMutationArgs {
  groupId: string;
}
export interface MarkAsReceivedMutationArgs {
  chatId: string;
}
export interface MarkAsReadMutationArgs {
  chatId: string;
}

import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig
} from "graphql";

import { ChatDb, MessageDb, RecipientDb, UserDb } from "./db";

import { AppContext } from "./schema/types";

export type Resolver<Result, Parent = {}, Context = {}, Args = {}> = (
  parent: Parent,
  args: Args,
  context: Context,
  info: GraphQLResolveInfo
) => Promise<Result> | Result;

export interface ISubscriptionResolverObject<Result, Parent, Context, Args> {
  subscribe<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo
  ): AsyncIterator<R | Result> | Promise<AsyncIterator<R | Result>>;
  resolve?<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo
  ): R | Result | Promise<R | Result>;
}

export type SubscriptionResolver<
  Result,
  Parent = {},
  Context = {},
  Args = {}
> =
  | ((
      ...args: any[]
    ) => ISubscriptionResolverObject<Result, Parent, Context, Args>)
  | ISubscriptionResolverObject<Result, Parent, Context, Args>;

export type TypeResolveFn<Types, Parent = {}, Context = {}> = (
  parent: Parent,
  context: Context,
  info: GraphQLResolveInfo
) => Maybe<Types>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult, TArgs = {}, TContext = {}> = (
  next: NextResolverFn<TResult>,
  source: any,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export namespace QueryResolvers {
  export interface Resolvers<Context = AppContext, TypeParent = {}> {
    me?: MeResolver<Maybe<UserDb>, TypeParent, Context>;

    users?: UsersResolver<Maybe<UserDb[]>, TypeParent, Context>;

    chats?: ChatsResolver<ChatDb[], TypeParent, Context>;

    chat?: ChatResolver<Maybe<ChatDb>, TypeParent, Context>;
  }

  export type MeResolver<
    R = Maybe<UserDb>,
    Parent = {},
    Context = AppContext
  > = Resolver<R, Parent, Context>;
  export type UsersResolver<
    R = Maybe<UserDb[]>,
    Parent = {},
    Context = AppContext
  > = Resolver<R, Parent, Context>;
  export type ChatsResolver<
    R = ChatDb[],
    Parent = {},
    Context = AppContext
  > = Resolver<R, Parent, Context>;
  export type ChatResolver<
    R = Maybe<ChatDb>,
    Parent = {},
    Context = AppContext
  > = Resolver<R, Parent, Context, ChatArgs>;
  export interface ChatArgs {
    chatId: string;
  }
}

export namespace UserResolvers {
  export interface Resolvers<Context = AppContext, TypeParent = UserDb> {
    id?: IdResolver<string, TypeParent, Context>;

    name?: NameResolver<Maybe<string>, TypeParent, Context>;

    picture?: PictureResolver<Maybe<string>, TypeParent, Context>;

    phone?: PhoneResolver<Maybe<string>, TypeParent, Context>;
  }

  export type IdResolver<
    R = string,
    Parent = UserDb,
    Context = AppContext
  > = Resolver<R, Parent, Context>;
  export type NameResolver<
    R = Maybe<string>,
    Parent = UserDb,
    Context = AppContext
  > = Resolver<R, Parent, Context>;
  export type PictureResolver<
    R = Maybe<string>,
    Parent = UserDb,
    Context = AppContext
  > = Resolver<R, Parent, Context>;
  export type PhoneResolver<
    R = Maybe<string>,
    Parent = UserDb,
    Context = AppContext
  > = Resolver<R, Parent, Context>;
}

export namespace ChatResolvers {
  export interface Resolvers<Context = AppContext, TypeParent = ChatDb> {
    id?: IdResolver<string, TypeParent, Context>;

    createdAt?: CreatedAtResolver<Date, TypeParent, Context>;

    name?: NameResolver<Maybe<string>, TypeParent, Context>;

    picture?: PictureResolver<Maybe<string>, TypeParent, Context>;

    allTimeMembers?: AllTimeMembersResolver<UserDb[], TypeParent, Context>;

    listingMembers?: ListingMembersResolver<UserDb[], TypeParent, Context>;

    actualGroupMembers?: ActualGroupMembersResolver<
      Maybe<UserDb[]>,
      TypeParent,
      Context
    >;

    admins?: AdminsResolver<Maybe<UserDb[]>, TypeParent, Context>;

    owner?: OwnerResolver<Maybe<UserDb>, TypeParent, Context>;

    isGroup?: IsGroupResolver<boolean, TypeParent, Context>;

    messages?: MessagesResolver<(Maybe<MessageDb>)[], TypeParent, Context>;

    lastMessage?: LastMessageResolver<Maybe<MessageDb>, TypeParent, Context>;

    updatedAt?: UpdatedAtResolver<Date, TypeParent, Context>;

    unreadMessages?: UnreadMessagesResolver<number, TypeParent, Context>;
  }

  export type IdResolver<
    R = string,
    Parent = ChatDb,
    Context = AppContext
  > = Resolver<R, Parent, Context>;
  export type CreatedAtResolver<
    R = Date,
    Parent = ChatDb,
    Context = AppContext
  > = Resolver<R, Parent, Context>;
  export type NameResolver<
    R = Maybe<string>,
    Parent = ChatDb,
    Context = AppContext
  > = Resolver<R, Parent, Context>;
  export type PictureResolver<
    R = Maybe<string>,
    Parent = ChatDb,
    Context = AppContext
  > = Resolver<R, Parent, Context>;
  export type AllTimeMembersResolver<
    R = UserDb[],
    Parent = ChatDb,
    Context = AppContext
  > = Resolver<R, Parent, Context>;
  export type ListingMembersResolver<
    R = UserDb[],
    Parent = ChatDb,
    Context = AppContext
  > = Resolver<R, Parent, Context>;
  export type ActualGroupMembersResolver<
    R = Maybe<UserDb[]>,
    Parent = ChatDb,
    Context = AppContext
  > = Resolver<R, Parent, Context>;
  export type AdminsResolver<
    R = Maybe<UserDb[]>,
    Parent = ChatDb,
    Context = AppContext
  > = Resolver<R, Parent, Context>;
  export type OwnerResolver<
    R = Maybe<UserDb>,
    Parent = ChatDb,
    Context = AppContext
  > = Resolver<R, Parent, Context>;
  export type IsGroupResolver<
    R = boolean,
    Parent = ChatDb,
    Context = AppContext
  > = Resolver<R, Parent, Context>;
  export type MessagesResolver<
    R = (Maybe<MessageDb>)[],
    Parent = ChatDb,
    Context = AppContext
  > = Resolver<R, Parent, Context, MessagesArgs>;
  export interface MessagesArgs {
    amount?: Maybe<number>;
  }

  export type LastMessageResolver<
    R = Maybe<MessageDb>,
    Parent = ChatDb,
    Context = AppContext
  > = Resolver<R, Parent, Context>;
  export type UpdatedAtResolver<
    R = Date,
    Parent = ChatDb,
    Context = AppContext
  > = Resolver<R, Parent, Context>;
  export type UnreadMessagesResolver<
    R = number,
    Parent = ChatDb,
    Context = AppContext
  > = Resolver<R, Parent, Context>;
}

export namespace MessageResolvers {
  export interface Resolvers<Context = AppContext, TypeParent = MessageDb> {
    id?: IdResolver<string, TypeParent, Context>;

    sender?: SenderResolver<UserDb, TypeParent, Context>;

    chat?: ChatResolver<ChatDb, TypeParent, Context>;

    content?: ContentResolver<string, TypeParent, Context>;

    createdAt?: CreatedAtResolver<Date, TypeParent, Context>;

    type?: TypeResolver<number, TypeParent, Context>;

    holders?: HoldersResolver<UserDb[], TypeParent, Context>;

    ownership?: OwnershipResolver<boolean, TypeParent, Context>;

    recipients?: RecipientsResolver<RecipientDb[], TypeParent, Context>;
  }

  export type IdResolver<
    R = string,
    Parent = MessageDb,
    Context = AppContext
  > = Resolver<R, Parent, Context>;
  export type SenderResolver<
    R = UserDb,
    Parent = MessageDb,
    Context = AppContext
  > = Resolver<R, Parent, Context>;
  export type ChatResolver<
    R = ChatDb,
    Parent = MessageDb,
    Context = AppContext
  > = Resolver<R, Parent, Context>;
  export type ContentResolver<
    R = string,
    Parent = MessageDb,
    Context = AppContext
  > = Resolver<R, Parent, Context>;
  export type CreatedAtResolver<
    R = Date,
    Parent = MessageDb,
    Context = AppContext
  > = Resolver<R, Parent, Context>;
  export type TypeResolver<
    R = number,
    Parent = MessageDb,
    Context = AppContext
  > = Resolver<R, Parent, Context>;
  export type HoldersResolver<
    R = UserDb[],
    Parent = MessageDb,
    Context = AppContext
  > = Resolver<R, Parent, Context>;
  export type OwnershipResolver<
    R = boolean,
    Parent = MessageDb,
    Context = AppContext
  > = Resolver<R, Parent, Context>;
  export type RecipientsResolver<
    R = RecipientDb[],
    Parent = MessageDb,
    Context = AppContext
  > = Resolver<R, Parent, Context>;
}

export namespace RecipientResolvers {
  export interface Resolvers<Context = AppContext, TypeParent = RecipientDb> {
    user?: UserResolver<UserDb, TypeParent, Context>;

    message?: MessageResolver<MessageDb, TypeParent, Context>;

    chat?: ChatResolver<ChatDb, TypeParent, Context>;

    receivedAt?: ReceivedAtResolver<Maybe<Date>, TypeParent, Context>;

    readAt?: ReadAtResolver<Maybe<Date>, TypeParent, Context>;
  }

  export type UserResolver<
    R = UserDb,
    Parent = RecipientDb,
    Context = AppContext
  > = Resolver<R, Parent, Context>;
  export type MessageResolver<
    R = MessageDb,
    Parent = RecipientDb,
    Context = AppContext
  > = Resolver<R, Parent, Context>;
  export type ChatResolver<
    R = ChatDb,
    Parent = RecipientDb,
    Context = AppContext
  > = Resolver<R, Parent, Context>;
  export type ReceivedAtResolver<
    R = Maybe<Date>,
    Parent = RecipientDb,
    Context = AppContext
  > = Resolver<R, Parent, Context>;
  export type ReadAtResolver<
    R = Maybe<Date>,
    Parent = RecipientDb,
    Context = AppContext
  > = Resolver<R, Parent, Context>;
}

export namespace MutationResolvers {
  export interface Resolvers<Context = AppContext, TypeParent = {}> {
    updateUser?: UpdateUserResolver<UserDb, TypeParent, Context>;

    addChat?: AddChatResolver<Maybe<ChatDb>, TypeParent, Context>;

    addGroup?: AddGroupResolver<Maybe<ChatDb>, TypeParent, Context>;

    updateGroup?: UpdateGroupResolver<Maybe<ChatDb>, TypeParent, Context>;

    removeChat?: RemoveChatResolver<Maybe<string>, TypeParent, Context>;

    addMessage?: AddMessageResolver<Maybe<MessageDb>, TypeParent, Context>;

    removeMessages?: RemoveMessagesResolver<
      Maybe<(Maybe<string>)[]>,
      TypeParent,
      Context
    >;

    addMembers?: AddMembersResolver<
      Maybe<(Maybe<string>)[]>,
      TypeParent,
      Context
    >;

    removeMembers?: RemoveMembersResolver<
      Maybe<(Maybe<string>)[]>,
      TypeParent,
      Context
    >;

    addAdmins?: AddAdminsResolver<
      Maybe<(Maybe<string>)[]>,
      TypeParent,
      Context
    >;

    removeAdmins?: RemoveAdminsResolver<
      Maybe<(Maybe<string>)[]>,
      TypeParent,
      Context
    >;

    setGroupName?: SetGroupNameResolver<Maybe<string>, TypeParent, Context>;

    setGroupPicture?: SetGroupPictureResolver<
      Maybe<string>,
      TypeParent,
      Context
    >;

    markAsReceived?: MarkAsReceivedResolver<
      Maybe<boolean>,
      TypeParent,
      Context
    >;

    markAsRead?: MarkAsReadResolver<Maybe<boolean>, TypeParent, Context>;
  }

  export type UpdateUserResolver<
    R = UserDb,
    Parent = {},
    Context = AppContext
  > = Resolver<R, Parent, Context, UpdateUserArgs>;
  export interface UpdateUserArgs {
    name?: Maybe<string>;

    picture?: Maybe<string>;
  }

  export type AddChatResolver<
    R = Maybe<ChatDb>,
    Parent = {},
    Context = AppContext
  > = Resolver<R, Parent, Context, AddChatArgs>;
  export interface AddChatArgs {
    userId: string;
  }

  export type AddGroupResolver<
    R = Maybe<ChatDb>,
    Parent = {},
    Context = AppContext
  > = Resolver<R, Parent, Context, AddGroupArgs>;
  export interface AddGroupArgs {
    userIds: string[];

    groupName: string;

    groupPicture?: Maybe<string>;
  }

  export type UpdateGroupResolver<
    R = Maybe<ChatDb>,
    Parent = {},
    Context = AppContext
  > = Resolver<R, Parent, Context, UpdateGroupArgs>;
  export interface UpdateGroupArgs {
    chatId: string;

    groupName?: Maybe<string>;

    groupPicture?: Maybe<string>;
  }

  export type RemoveChatResolver<
    R = Maybe<string>,
    Parent = {},
    Context = AppContext
  > = Resolver<R, Parent, Context, RemoveChatArgs>;
  export interface RemoveChatArgs {
    chatId: string;
  }

  export type AddMessageResolver<
    R = Maybe<MessageDb>,
    Parent = {},
    Context = AppContext
  > = Resolver<R, Parent, Context, AddMessageArgs>;
  export interface AddMessageArgs {
    chatId: string;

    content: string;
  }

  export type RemoveMessagesResolver<
    R = Maybe<(Maybe<string>)[]>,
    Parent = {},
    Context = AppContext
  > = Resolver<R, Parent, Context, RemoveMessagesArgs>;
  export interface RemoveMessagesArgs {
    chatId: string;

    messageIds?: Maybe<(Maybe<string>)[]>;

    all?: Maybe<boolean>;
  }

  export type AddMembersResolver<
    R = Maybe<(Maybe<string>)[]>,
    Parent = {},
    Context = AppContext
  > = Resolver<R, Parent, Context, AddMembersArgs>;
  export interface AddMembersArgs {
    groupId: string;

    userIds: string[];
  }

  export type RemoveMembersResolver<
    R = Maybe<(Maybe<string>)[]>,
    Parent = {},
    Context = AppContext
  > = Resolver<R, Parent, Context, RemoveMembersArgs>;
  export interface RemoveMembersArgs {
    groupId: string;

    userIds: string[];
  }

  export type AddAdminsResolver<
    R = Maybe<(Maybe<string>)[]>,
    Parent = {},
    Context = AppContext
  > = Resolver<R, Parent, Context, AddAdminsArgs>;
  export interface AddAdminsArgs {
    groupId: string;

    userIds: string[];
  }

  export type RemoveAdminsResolver<
    R = Maybe<(Maybe<string>)[]>,
    Parent = {},
    Context = AppContext
  > = Resolver<R, Parent, Context, RemoveAdminsArgs>;
  export interface RemoveAdminsArgs {
    groupId: string;

    userIds: string[];
  }

  export type SetGroupNameResolver<
    R = Maybe<string>,
    Parent = {},
    Context = AppContext
  > = Resolver<R, Parent, Context, SetGroupNameArgs>;
  export interface SetGroupNameArgs {
    groupId: string;
  }

  export type SetGroupPictureResolver<
    R = Maybe<string>,
    Parent = {},
    Context = AppContext
  > = Resolver<R, Parent, Context, SetGroupPictureArgs>;
  export interface SetGroupPictureArgs {
    groupId: string;
  }

  export type MarkAsReceivedResolver<
    R = Maybe<boolean>,
    Parent = {},
    Context = AppContext
  > = Resolver<R, Parent, Context, MarkAsReceivedArgs>;
  export interface MarkAsReceivedArgs {
    chatId: string;
  }

  export type MarkAsReadResolver<
    R = Maybe<boolean>,
    Parent = {},
    Context = AppContext
  > = Resolver<R, Parent, Context, MarkAsReadArgs>;
  export interface MarkAsReadArgs {
    chatId: string;
  }
}

/** Directs the executor to skip this field or fragment when the `if` argument is true. */
export type SkipDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  SkipDirectiveArgs,
  AppContext
>;
export interface SkipDirectiveArgs {
  /** Skipped when true. */
  if: boolean;
}

/** Directs the executor to include this field or fragment only when the `if` argument is true. */
export type IncludeDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  IncludeDirectiveArgs,
  AppContext
>;
export interface IncludeDirectiveArgs {
  /** Included when true. */
  if: boolean;
}

/** Marks an element of a GraphQL schema as no longer supported. */
export type DeprecatedDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  DeprecatedDirectiveArgs,
  AppContext
>;
export interface DeprecatedDirectiveArgs {
  /** Explains why this element was deprecated, usually also including a suggestion for how to access supported similar data. Formatted using the Markdown syntax (as specified by [CommonMark](https://commonmark.org/). */
  reason?: string;
}

export interface DateScalarConfig extends GraphQLScalarTypeConfig<Date, any> {
  name: "Date";
}

export interface IResolvers<Context = AppContext> {
  Query?: QueryResolvers.Resolvers<Context>;
  User?: UserResolvers.Resolvers<Context>;
  Chat?: ChatResolvers.Resolvers<Context>;
  Message?: MessageResolvers.Resolvers<Context>;
  Recipient?: RecipientResolvers.Resolvers<Context>;
  Mutation?: MutationResolvers.Resolvers<Context>;
  Date?: GraphQLScalarType;
}

export interface IDirectiveResolvers<Result> {
  skip?: SkipDirectiveResolver<Result>;
  include?: IncludeDirectiveResolver<Result>;
  deprecated?: DeprecatedDirectiveResolver<Result>;
}
