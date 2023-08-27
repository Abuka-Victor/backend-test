import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class FolderItem extends Model<InferAttributes<FolderItem>, InferCreationAttributes<FolderItem>> {
  declare item_id: CreationOptional<number>;
  declare isFolder: boolean;
  declare downloadUrl: CreationOptional<string>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare name: string;
  declare storageName: CreationOptional<string>;
}

FolderItem.init({
  item_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  isFolder: { type: DataTypes.BOOLEAN },
  downloadUrl: { type: DataTypes.STRING },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
  name: DataTypes.STRING,
  storageName: DataTypes.STRING
},
  {
    tableName: 'folderItems',
    sequelize
  })

export default FolderItem