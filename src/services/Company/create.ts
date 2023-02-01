import { CompanyRepository } from "../../repositories/CompanyRepository";
import { UserRepository } from "../../repositories/UserRepository";

interface Attributes {
  employer: string;
  company_name: string;
  email: string;
}

export class Create {
  async execute({ employer, company_name, email }: Attributes) {
    const user = await UserRepository.findOne({ where: { email: email } })

    if(!user) {
      return new Error("User not fould!")
    }

    const company = await CompanyRepository.findOne({
      where: { company: company_name }
    })

    if (company) {
      return new Error("Company already exist!")
    }

    const newCompany = CompanyRepository.create({
      employer,
      company: company_name,
      user
    })

    await CompanyRepository.save(newCompany)
  }
}
