import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Appointment } from '../entity/appointments';

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @Field(() => ID )
  @PrimaryGeneratedColumn()
  id: string;

  @Field(() => String )
  @Column()
  name: string;

  @Field(() => String )
  @Column()
  email: string;

  @Field(() => String )
  @Column()
  password: string;

  @Field(() => Boolean )
  @Column()
  provider: boolean;

  @Field(() => [Appointment]) 
  @OneToMany(() => Appointment, (appointment: Appointment) => appointment.user_id )
  @JoinColumn({ name: "owner_id" })
  owner_id: Appointment[];

  @Field(() => [Appointment])
  @OneToMany(() => Appointment, (appointment: Appointment) => appointment.provider_id )
  @JoinColumn({ name: "customers_id" })
  customers_id: Appointment[];

  //porque no se creo ningun campo en la tabla use de la base de datos.

}