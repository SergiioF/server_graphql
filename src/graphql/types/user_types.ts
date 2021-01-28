import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class FindUserObject {
  @Field(() => Boolean, { nullable: true })
  status: boolean;

  @Field(() => String, { nullable: true })
  message: string;
}
