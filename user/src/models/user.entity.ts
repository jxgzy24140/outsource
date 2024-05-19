import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Role } from "./role.entity";
import { AutoMap } from "@automapper/classes";

@Entity()
export class User {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id!: number;
  @AutoMap()
  @Column()
  roleId!: number;
  @AutoMap()
  @Column({ nullable: false })
  fullName!: string;
  @AutoMap()
  @Column({ nullable: false })
  email!: string;
  @AutoMap()
  @Column({ nullable: false })
  password!: string;

  @AutoMap()
  @Column({ nullable: false })
  createdDate!: Date;

  @AutoMap()
  @Column({ nullable: true })
  updatedDate?: Date;

  @AutoMap()
  @Column({ nullable: false })
  isDeleted!: boolean;

  @ManyToOne(() => Role)
  role!: Role;
}
