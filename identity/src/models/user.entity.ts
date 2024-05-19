import { AutoMap } from "@automapper/classes";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  userId!: number;

  @Column({ nullable: false })
  roleId!: number;

  @Column({ nullable: false })
  fullName!: string;
  @Column({ nullable: false })
  email!: string;

  @Column({ nullable: false })
  password!: string;

  @Column({ nullable: false })
  createdDate!: Date;

  @Column({ nullable: true })
  updatedDate?: Date;

  @Column({ nullable: false })
  isDeleted!: boolean;
}
