import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import {User} from '../entity/users'

@Entity()
@ObjectType()
export class Appointment extends BaseEntity {
  @Field(() => ID )
  @PrimaryGeneratedColumn()
  id: string;

  @Field(() => Date)
  @Column()
  date: Date;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user: User) => user.owner_id, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({ name: "provider_id" })
  provider_id: User;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user: User) => user.customers_id, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({ name: "user_id" })
  user_id: User;
}

