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
    userId: Int
    tasks: [Task]
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

  type Query {
    allUsers: [User!]!
    getUser(id: Int!): User!
    getProject(projectId: Int!): Project!
    me: User
    getProjectsByUserId: [Project]
    getTasks(projectId: Int!): [Task!]
    getInvites(userId: Int!): [Invitation]
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

    createProject(name: String!, userId: Int!): Project!

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

    createInvite(projectId: Int!, senderId: Int!, inviteeId: Int!): Boolean!
  }
`;
