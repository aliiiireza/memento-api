import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../database/config";

interface EventAttributes {
  id: number;
  name: string;
  slug: string;
  description?: string;
  foodGroup?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface EventInput extends Optional<EventAttributes, "id" | "slug"> {}
export interface EventOutput extends Required<EventAttributes> {}

class Event
  extends Model<EventAttributes, EventInput>
  implements EventAttributes
{
  public id!: number;
  public name!: string;
  public slug!: string;
  public description!: string;
  public foodGroup!: string;

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
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
    },
    foodGroup: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true,
  }
);

export default Event;
