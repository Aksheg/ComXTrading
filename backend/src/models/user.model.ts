import {
    Table,
    Column,
    Model,
    PrimaryKey,
    DataType,
    HasMany,
    Default,
  } from "sequelize-typescript";
  import { v4 as uuidv4 } from "uuid";
  
  @Table({ tableName: "users" })
  export class User extends Model {
    @PrimaryKey
    @Default(uuidv4)
    @Column(DataType.UUID)
    id!: string;
  
    @Column(DataType.STRING)
    companyName!: string;
  
    @Column(DataType.STRING)
    businessType!: string;
  
    @Column(DataType.DATE)
    incorporationDate!: Date;
  
    @Column(DataType.STRING)
    email!: string;
  
    @Column(DataType.STRING)
    password!: string;
  
    @Column(DataType.STRING)
    firstName!: string;
  
    @Column(DataType.STRING)
    lastName!: string;
  
    @Column(DataType.STRING)
    phoneNumber!: string;
  
    @Column(DataType.STRING)
    countryCode!: string;
  
    @Column(DataType.ENUM("individual", "corporate"))
    category!: "individual" | "corporate";
  
    @Column(DataType.BOOLEAN)
    staySignedIn!: boolean;
  }
  
  export default User;