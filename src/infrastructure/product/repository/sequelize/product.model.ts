import { Column, PrimaryKey, Table, Model } from "sequelize-typescript";

@Table({

    tableName: 'products',
    timestamps: false,
    indexes: [
        {
            fields: ['id'],
            unique: true
        }
    ]
})
export default class ProductModel extends Model {

@PrimaryKey
@Column
declare id: string;

@Column({ allowNull: false })
declare name: string;

@Column({ allowNull: false })
declare price: number;

}