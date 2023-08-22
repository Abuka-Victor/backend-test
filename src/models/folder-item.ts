import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey } from 'sequelize';
import sequelize from '../config/database';
import { User, Folder } from './index';

class FolderItem extends Model<InferAttributes<FolderItem>, InferCreationAttributes<FolderItem>> {
  declare item_id: CreationOptional<number>;
  declare folder_id: ForeignKey<Folder["folder_id"]>;
  declare user_id: ForeignKey<User['id']>;
  declare isFolder: boolean;
  declare downloadUrl: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

FolderItem.init({
  item_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  isFolder: { type: DataTypes.BOOLEAN },
  downloadUrl: { type: DataTypes.STRING },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
},
  {
    tableName: 'folderItems',
    sequelize
  })

export default FolderItem