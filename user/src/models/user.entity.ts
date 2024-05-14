import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Role } from "./role.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  roleId!: number;

  @Column({ length: 15, nullable: false })
  firstName!: string;

  @Column({ length: 15, nullable: false })
  lastName!: string;

  @Column({ nullable: false })
  email!: string;

  @Column({ nullable: false })
  password!: string;

  @ManyToOne(() => Role)
  role!: Role;
}
