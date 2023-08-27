import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, HasManyAddAssociationMixin, HasManyAddAssociationsMixin, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin, HasManyHasAssociationsMixin, HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, HasManySetAssociationsMixin, NonAttribute, Association } from 'sequelize';
import sequelize from '../config/database';
import { Folder } from "./index"

class User extends Model<InferAttributes<User, { omit: 'folders', }>, InferCreationAttributes<User, { omit: 'folders' }>> {
  declare id: CreationOptional<number>;
  declare fullname: string;
  declare email: string;
  declare passwordHash: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare getFolders: HasManyGetAssociationsMixin<Folder>;
  declare addFolder: HasManyAddAssociationMixin<Folder, number>;
  declare addFolders: HasManyAddAssociationsMixin<Folder, number>;
  declare setFolders: HasManySetAssociationsMixin<Folder, number>;
  declare removeFolder: HasManyRemoveAssociationMixin<Folder, number>;
  declare removeFolders: HasManyRemoveAssociationsMixin<Folder, number>;
  declare hasFolder: HasManyHasAssociationMixin<Folder, number>;
  declare hasFolders: HasManyHasAssociationsMixin<Folder, number>;
  declare countFolders: HasManyCountAssociationsMixin;
  declare createFolder: HasManyCreateAssociationMixin<Folder>;

  declare folders?: NonAttribute<Folder[]>;

  declare static associations: {
    folders: Association<User, Folder>;
  };
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  fullname: {
    type: new DataTypes.STRING(128),
    allowNull: false
  },
  email: {
    type: new DataTypes.STRING(128),
    allowNull: false
  },
  passwordHash: {
    type: new DataTypes.STRING(128),
    allowNull: false
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
},
  {
    tableName: 'users',
    sequelize
  })

export default User