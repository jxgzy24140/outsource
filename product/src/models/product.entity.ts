import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Category } from "./category.entity";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  categoryId!: number;

  @Column({ length: 15, nullable: false })
  productName!: string;

  @Column({ length: 15, nullable: false })
  price!: string;

  @Column({ nullable: false })
  image!: string;

  @Column({ nullable: false })
  quantity!: string;

  @ManyToOne(() => Category)
  category!: Category;
}
