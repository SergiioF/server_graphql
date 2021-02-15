import { InputType, Field } from "type-graphql";

@InputType()
export class CreateAppointmentInput {
  @Field()
  date: Date;

  @Field({nullable: true})
  provider_id?: string;

  @Field({nullable: true})
  user_id?: string;
}