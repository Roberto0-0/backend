import { CompanyRepository } from "../../repositories/CompanyRepository";
import { CreatePasswordHash } from "../Bcrypt";

interface Attributes {
  company_name: string;
  employer: string;
  email: string;
  password: string;
  confirm_password: string;
}

export class Create {
  async execute({ company_name, employer, email, password, confirm_password }: Attributes) {
    const company = await CompanyRepository.findOne({
      where: { email: email }
    })

    const company_name_check = await CompanyRepository.findOne({
      where: { company: company_name }
    })

    if (company) {
      return new Error("Email already exist!")
    }

    if (company_name_check) {
      return new Error("Company name already exist!")
    }


    if (confirm_password != password) {
      return new Error("Different password")
    }

    const newPassword = await CreatePasswordHash(password)

    const newCompany = CompanyRepository.create({
      company: company_name,
      employer,
      email,
      password: newPassword
    })

    await CompanyRepository.save(newCompany)
  }
}
