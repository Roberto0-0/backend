import { CompanyRepository } from "../../repositories/CompanyRepository";
import { PostRepository } from "../../repositories/PostRepository";

export interface Attributes {
  company_id: string;
  companyName: string;
  vancancy: string;
  location: string;
  salary: number;
  information?: string;
}

export class Create {
  async execute({ company_id, companyName, vancancy, location, salary, information }: Attributes) {
    const company = await CompanyRepository.findOneBy({ id: company_id })

    if (!company) {
      return new Error("Company not fould!")
    }

    const post = await PostRepository.findOne({
      where: { company_name: companyName }
    })

    if (post) {
      return new Error("There is already a compinia with that name!")
    }

    const newPost = PostRepository.create({
      company_name: companyName,
      vancancy,
      location,
      salary,
      information,
      company
    })

    await PostRepository.save(newPost)
  }
}
