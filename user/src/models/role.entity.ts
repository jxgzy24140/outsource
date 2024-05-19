import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { User } from "./user.entity";
import { AutoMap } from "@automapper/classes";

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  roleName!: string;

  @AutoMap()
  @Column({ nullable: false })
  createdDate!: Date;

  @AutoMap()
  @Column({ nullable: true })
  updatedDate?: Date;
  
  @AutoMap()
  @Column({ nullable: false })
  isDeleted!: boolean;

  @OneToMany(() => User, (user: User) => user.role)
  users?: User[];
}
