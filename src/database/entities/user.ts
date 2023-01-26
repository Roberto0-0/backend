import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm"
import { Like } from "./like"

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string
  
  @Column({ 
    type: "varchar",
    nullable: false
    })
  name: string
  
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
  
  @OneToMany(() => Like, (like) => like.user)
  like: Like[]
  
  @CreateDateColumn()
  created_at: Date
  
  @UpdateDateColumn()
  updated_at: Date
}