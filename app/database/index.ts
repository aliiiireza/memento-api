import { SyncOptions } from "sequelize/types";
import { Event, User, Role } from "../models";
import sequelize from "./config";
const isDev = process.env.NODE_ENV === "development";
const options: SyncOptions = { force: isDev, alter: isDev };

export default async () => {
  Role.belongsToMany(User, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId",
  });

  User.belongsToMany(Role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId",
  });

  sequelize.sync(options).then(() => {
    Role.create(
      {
        id: 1,
        name: "user",
      },
      {
        ignoreDuplicates: true,
      }
    );
    Role.create(
      {
        id: 2,
        name: "moderator",
      },
      {
        ignoreDuplicates: true,
      }
    );

    Role.create(
      {
        id: 3,
        name: "admin",
      },
      {
        ignoreDuplicates: true,
      }
    );
  });
};
