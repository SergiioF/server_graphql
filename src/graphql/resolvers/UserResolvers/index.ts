import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { User } from '../../../database/entity/users'
import { CreateUserInput } from "../../../graphql/types/InputTypes/CreateUserInput"
import { FindUserObject } from "../../types/user_types";

@Resolver()
export class UserResolver {
  @Query(() => User)
  user(@Arg("id") id: string) {
    const user = User.findOne({ where: { id } });

    return user;
  }

  @Query(() => [User])
  users() {
    return User.find()
  }
  
  //Create a user
  @Mutation(() => FindUserObject)
    async createUser(@Arg("data") data: CreateUserInput) {
    const user = User.create(data);
    await user.save();
    return user;
  }
}
