import { UserRepository } from "../../repositories/UserRepository";

export class Read {
  async execute(id: string): Promise<typeof user | Error> {
    const user = await UserRepository.findOne({
      where: { id: id },
      relations: {
        like: true
      }
    })

    if (!user) {
      return new Error("User not fould!")
    }

    return user
  }

}
