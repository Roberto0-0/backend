import { UserRepository } from "../../repositories/UserRepository"
import { CreatePasswordHash} from "../Bcrypt/index"

interface Attributes {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export class Create {
  async execute({ name, email, password, confirmPassword }: Attributes) {
    const user = await UserRepository.findOne({
      where: { email: email }
    })
    
    if(user) {
      return new Error("User already exist!")
    }
    
    if(password !== confirmPassword) {
      return new Error("Differents password!")
    }
    
    const newPassword = await CreatePasswordHash(password)
    
    console.log(newPassword)
    
    const newUser = UserRepository.create({
      name,
      email,
      password: newPassword
    })
    
    await UserRepository.save(newUser)
  }
}