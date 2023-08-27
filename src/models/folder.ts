import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey, HasManyAddAssociationMixin, HasManyAddAssociationsMixin, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin, HasManyHasAssociationsMixin, HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, HasManySetAssociationsMixin, NonAttribute, Association } from 'sequelize';
import sequelize from '../config/database';
import { FolderItem } from './index';

class Folder extends Model<InferAttributes<Folder, { omit: 'folderItems' }>, InferCreationAttributes<Folder, { omit: 'folderItems' }>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare parent_id: ForeignKey<Folder["id"]>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare getFolderItems: HasManyGetAssociationsMixin<FolderItem>;
  declare addFolderItem: HasManyAddAssociationMixin<FolderItem, number>;
  declare addFolderItems: HasManyAddAssociationsMixin<FolderItem, number>;
  declare setFolderItems: HasManySetAssociationsMixin<FolderItem, number>;
  declare removeFolderItem: HasManyRemoveAssociationMixin<FolderItem, number>;
  declare removeFolderItems: HasManyRemoveAssociationsMixin<FolderItem, number>;
  declare hasFolderItem: HasManyHasAssociationMixin<FolderItem, number>;
  declare hasFolderItems: HasManyHasAssociationsMixin<FolderItem, number>;
  declare countFolderItems: HasManyCountAssociationsMixin;
  declare createFolderItem: HasManyCreateAssociationMixin<FolderItem>;

  declare folderItems?: NonAttribute<FolderItem[]>;

  declare static associations: {
    folderItems: Association<Folder, FolderItem>;
  };

}

Folder.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: { type: DataTypes.STRING, allowNull: false },
  parent_id: { type: DataTypes.INTEGER, allowNull: true },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
},
  {
    tableName: 'folders',
    sequelize
  })

export default Folder