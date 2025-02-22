import {
    Table,
    Column,
    Model,
    PrimaryKey,
    DataType,
    ForeignKey,
    BelongsTo,
    Default,
  } from "sequelize-typescript";
  import { v4 as uuidv4 } from "uuid";
  import { User } from "./user.model";
  
  @Table({ tableName: "otp" })
  export class OTP extends Model {
    @PrimaryKey
    @Default(uuidv4)
    @Column(DataType.UUID)
    id!: string;
  
    @Column(DataType.STRING)
    code!: string;
  
    @Column(DataType.DATE)
    expiresAt!: Date;
  
    @ForeignKey(() => User)
    @Column(DataType.UUID)
    userId!: string;
  
    @BelongsTo(() => User)
    user!: User;
  }
  
  export default OTP;