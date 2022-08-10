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

  type Query {
    allUsers: [User!]!
    getUser(id: Int!): User!
    allProjects: [Project!]
    getProject(id: Int!): Project!
  }

  type Mutation {
    createUser(
      firstName: String
      lastName: String
      email: String!
      password: String!
    ): User!

    createProject(name: String!, userId: Int!): Project!
  }
`;
