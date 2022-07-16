import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../database/config";

interface EventAttributes {
  id: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface EventInput extends Optional<EventAttributes, "id"> {}
export interface EventOutput extends Required<EventAttributes> {}

class Event
  extends Model<EventAttributes, EventInput>
  implements EventAttributes
{
  public id!: number;
  public name!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Event.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    modelName: "event",
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true,
  }
);

export default Event;
