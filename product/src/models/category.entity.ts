import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Product } from "./product.entity";
import { AutoMap } from "@automapper/classes";

@Entity()
export class Category {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id!: number;
  @AutoMap()
  @Column()
  categoryName!: string;

  @AutoMap()
  @Column({ nullable: false })
  createdDate!: Date;

  @AutoMap()
  @Column({ nullable: true })
  updatedDate?: Date;

  @AutoMap()
  @Column({ nullable: false })
  isDeleted!: boolean;

  @AutoMap()
  @OneToMany(() => Product, (product: Product) => product.category)
  products?: Product[];
}
