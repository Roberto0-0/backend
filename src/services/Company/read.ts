import { CompanyRepository } from "../../repositories/CompanyRepository";

export class Read {
  async execute(id: string) {
    const company = await CompanyRepository.findOne({
      where: { id: id },
      relations: {
        post: true,
        user: true
      }
    })

    if (!company) {
      return new Error("Company not fould!")
    }

    return company
  }
}
