import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Product } from "./product.entity";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  categoryName!: string;

  @OneToMany(() => Product, (product: Product) => product.category)
  products?: Product[];
}
