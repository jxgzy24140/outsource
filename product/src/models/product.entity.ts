import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Category } from "./category.entity";
import { AutoMap } from "@automapper/classes";

@Entity()
export class Product {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id!: number;

  @AutoMap()
  @Column()
  typeId!: number;

  @AutoMap()
  @Column()
  categoryId!: number;

  @AutoMap()
  @Column({ nullable: false })
  productName!: string;

  @AutoMap()
  @Column({ nullable: false })
  price!: string;

  @AutoMap()
  @Column({ nullable: false })
  image!: string;

  @AutoMap()
  @Column({ nullable: false })
  size!: number;

  @AutoMap()
  @Column({ nullable: false })
  quantity!: string;

  @AutoMap()
  @Column({ nullable: false })
  createdDate!: Date;

  @AutoMap()
  @Column({ nullable: true })
  updatedDate?: Date;

  @AutoMap()
  @Column({ nullable: false })
  isDeleted!: boolean;

  @ManyToOne(() => Category)
  category!: Category;
}
