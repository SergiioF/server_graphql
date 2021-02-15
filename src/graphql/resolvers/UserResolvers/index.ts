import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { User } from '../../../database/entity/users'
import { CreateUserInput } from "../../../graphql/types/InputTypes/CreateUserInput"
import { UpdateUserInput } from "../../..//graphql/types/InputTypes/UpdateUserInput";
import { UserCreatedObject } from "../../types/user_types";

@Resolver()
export class UserResolver {
  //Encontrar cualquier usuario sin relación.
  @Query(() => User)
  user(@Arg("id") id: string) {
    const user = User.findOne({ where: { id } });
    return user;
  }

  //Encontrar los usuarios clientes y su relación con appointment.
  @Query(() => User)
  async customer(@Arg("id") id: string) {
    return await User.findOne(id ,{ relations: ["owner_id"] })
  }

  //Encontrar los usuarios provider y su relación con appointment.
  @Query(() => User)
  async provider(@Arg("id") id: string) {
    return await User.findOne(id, {relations: ["customers_id"]})
  }
  
    //List all user
  @Query(() => [User])
  users() {
    return User.find()
  }

  //Create a user
  @Mutation(() => UserCreatedObject)
    async createUser(@Arg("data") data: CreateUserInput) {
    const user = User.create(data);
    await user.save();
    return {status: true, message: "User created"};
  }

  //Update a user
  @Mutation(() => UserCreatedObject)
  async updateUser(@Arg("id", () => String) id: string, 
                   @Arg("data", () => UpdateUserInput) data: UpdateUserInput) {
    const user = await User.findOne({ where: { id } });
    if (!user){
      return { status: false, message: "User not found!"}
    }
    await User.update({ id }, data);
    return {status: true, message: "User created"};
    // Object.assign(user, data);
  }

  //Delete user
  @Mutation(() => Boolean)
  async deleteUser(@Arg("id") id: string) {
    const user = await User.findOne({ where: { id } });
    if (!user){
      return { status: false, message: "User not found!"}
    }
    await User.delete(id);
    return true;
  }
}
