import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { Appointment } from '../../../database/entity/appointments';
import { User } from '../../../database/entity/users';
import { CreateAppointmentInput } from "../../../graphql/types/InputTypes/CreateAppointmentInput"
import { UserCreatedObject } from "../../types/user_types";


@Resolver()
export class AppointmentResolver {
  //find user by id
  @Query(() => Appointment)
  appointment(@Arg("id") id: string) {
    const appointment = Appointment.findOne({ where: { id } });
    return appointment;
  }

//find all appointment
  @Query(() => [Appointment])
  async appointments() {
    return await Appointment.find({ 
      relations: ["provider_id", "user_id"]
    })
  }
  
  //Create a user
  @Mutation(() => UserCreatedObject)
    async createAppointment(@Arg("data") data: CreateAppointmentInput) {
      try {
        const appointment = new Appointment();
        const provider = await User.findOne({ 
          where: { 
            id: data.provider_id, provider: true 
          } 
        })
        const user = await User.findOne(data.user_id)
    
        if(!provider){
          return console.log("solo puedes crear un agendamiento con un prestador")
        } else {
          appointment.provider_id = provider; 
          console.log("Creo el agendamiento")
        }
  
        if(user){
          appointment.user_id = user;
        }

        appointment.date =  data.date
  
        await appointment.save();
        return { status: true, message: "User created" };
      } catch(e){
        console.log(e)
        return { status: false, err: "An err ocurred" };

      }
  }
}


