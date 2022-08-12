const { gql } = require("apollo-server-express");

module.exports = gql`
  type User {
    id: Int!
    firstName: String
    lastName: String
    email: String
    project: [Project]
  }

  type Project {
    id: Int!
    name: String
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
    getProject(id: Int!): Project!
    me: User
    getProjectsByUserId(userId: Int!): [Project]
  }

  type Mutation {
    register(
      firstName: String
      lastName: String
      email: String!
      password: String!
    ): UserResponse!

    login(email: String!, password: String!): UserResponse!

    logout: Boolean!

    createProject(name: String!, userId: Int!): Project!
  }
`;
