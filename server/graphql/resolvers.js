const bcrypt = require("bcryptjs");

module.exports = {
  Query: {
    allUsers: (root, args, { models }) => {
      return models.User.findAll({
        include: [{ model: models.Project }],
      });
    },
    getUser: (root, { id }, { models }) => {
      return models.User.findByPk(id, {
        include: [{ model: models.Project, as: "project" }],
      });
    },
    allProjects: (root, args, { models }) => {
      return models.Project.findAll();
    },
    getProject: (root, { id }, { models }) => {
      return models.Project.findByPk(id);
    },
  },
  Mutation: {
    createUser: async (parent, args, { models }) => {
      const { firstName, lastName, email, password } = args;

      const hash = await bcrypt.hash(password, 5);

      return models.User.create({
        firstName,
        lastName,
        email,
        password: hash,
      });
    },
    createProject: (parent, args, { models }) => {
      try {
        return models.Project.create(args);
      } catch (err) {
        console.error(err);
      }
    },
  },
};
