import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey, HasManyAddAssociationMixin, HasManyAddAssociationsMixin, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin, HasManyHasAssociationsMixin, HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, HasManySetAssociationsMixin, NonAttribute, Association } from 'sequelize';
import sequelize from '../config/database';
import { User, FolderItem } from './index';

class Folder extends Model<InferAttributes<Folder, { omit: 'folderItems' }>, InferCreationAttributes<Folder, { omit: 'folderItems' }>> {
  declare folder_id: CreationOptional<number>;
  declare user_id: ForeignKey<User['id']>;
  declare parent_id: ForeignKey<Folder["folder_id"]>;
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
  declare createFolderItem: HasManyCreateAssociationMixin<FolderItem, 'user_id'>;

  declare folderItems?: NonAttribute<FolderItem[]>;

  declare static associations: {
    folderItems: Association<Folder, FolderItem>;
  };

}

Folder.init({
  folder_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  parent_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
},
  {
    tableName: 'folders',
    sequelize
  })

export default Folder