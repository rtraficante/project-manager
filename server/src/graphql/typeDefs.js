const { gql } = require("apollo-server-express");

module.exports = gql`
  scalar Date

  type User {
    id: Int!
    firstName: String
    lastName: String
    email: String
    username: String
    project: [Project]
  }

  type Project {
    id: Int!
    name: String
    tasks: [Task]
    users: [User]
  }

  type UserProject {
    id: Int!
    project: Project
    user: User
  }

  type Task {
    id: Int!
    name: String!
    description: String
    due: Date
    status: String!
    createdAt: String
    projectId: Int
  }

  type Invitation {
    id: Int!
    sender: User!
    invitee: User!
    project: Project!
  }

  type FieldError {
    field: String
    message: String
  }

  type UserResponse {
    errors: [FieldError]
    user: User
  }

  type InviteError {
    message: String
  }

  type InviteResponse {
    errors: [InviteError]
    status: Boolean!
  }

  type GetProjectError {
    type: String
    message: String
  }

  type GetProjectResponse {
    errors: [GetProjectError]
    project: Project
  }

  type Query {
    allUsers: [User]!
    getUser(email: String!): User!
    getProject(projectId: Int!): GetProjectResponse!
    me: User
    getProjectsByUserId: [UserProject]
    getTasks(projectId: Int!): [Task!]
    getInvites: [Invitation]
  }

  type Mutation {
    register(
      firstName: String
      lastName: String
      email: String!
      username: String!
      password: String!
    ): UserResponse!

    login(email: String!, password: String!): UserResponse!

    logout: Boolean!

    createProject(name: String!): UserProject!

    deleteProject(id: Int!): Boolean!

    createTask(
      name: String!
      description: String
      due: Date
      projectId: Int!
    ): Task!

    editTaskStatus(id: Int!, status: String!): Boolean!

    editTask(id: Int!, name: String, description: String, due: Date): Task!

    deleteTask(id: Int!): Boolean!

    createInvite(
      projectId: Int!
      senderId: Int!
      inviteeId: Int!
    ): InviteResponse!

    acceptInvite(inviteId: Int!): Boolean!

    declineInvite(inviteId: Int!): Boolean!
  }
`;
