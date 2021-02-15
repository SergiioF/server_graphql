import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class UserCreatedObject {
  @Field(() => Boolean, { nullable: true })
  status: boolean;

  @Field(() => String, { nullable: true })
  message: string;
}
