import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm"
import { Post } from "./post"

@Entity("companies")
export class Company {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({
    type: "varchar",
    nullable: false
  })
  company: string

  @Column({
    type: "varchar",
    nullable: false
  })
  employer: string

  @Column({
    type: "varchar",
    unique: true,
    nullable: false
  })
  email: string

  @Column({
    type: "varchar",
    nullable: false
  })
  password: string

  @OneToMany(() => Post, (post) => post.company, {
    onDelete: 'CASCADE'
  })
  post: Post[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
