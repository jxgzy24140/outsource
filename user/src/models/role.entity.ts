import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  roleName!: string;

  @OneToMany(() => User, (user: User) => user.role)
  users?: User[];
}
