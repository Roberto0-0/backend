import { Request, Response } from "express"
import { Create } from "../services/Company/create"
import { ReadAll } from "../services/Company/readAll"
import { Read } from "../services/Company/read"
import { Update } from "../services/Company/update"
import { Delete } from "../services/Company/delete"
import _ from "lodash"
import { CompanySchema } from "../schemas/companySchema"

export class CompanyController {
  async create(req: Request, res: Response) {
    try {
      const {error, value} = CompanySchema.validate(req.body)

      if(error) {
        return res.status(422).json({
          status: 'error',
          message: 'Invalid request data. Please review request and try again.',
          error: {
            details: _.map(error.details, ({message, type}) => ({
                message: message.replace(/['"]/g, ''),
                type
            }))
          }
        })
      }
      const service = new Create()
      const result = await service.execute(value)
      
      if(result instanceof Error) {
        return res.status(400).send({ message: result.message })
      }
      
      return res.status(201).json({
        status: 'success',
        messag: 'Company created successfully!',
        data: value
      })
    } catch (error) {
      console.error(error)
      return res.status(500).send({ message: "Internal server error!" })
    }
  }

  async read(req: Request, res: Response) {
    const { id } = req.params

    try {
      const service = new Read()
      const result = await service.execute(id)

      if (result instanceof Error) {
        return res.status(400).send({ message: result.message })
      }

      return res.status(200).send(result)
    } catch (error) {
      console.error(error)
      res.status(500).send({ message: "Internal server error!" })
    }
  }

  async readAll(req: Request, res: Response) {
    try {
      const service = new ReadAll()
      const result = await service.execute()

      if (result instanceof Error) {
        return res.status(400).send({ message: result.message })
      }

      return res.status(200).send(result)
    } catch (error) {

    }
  }

  async update(req: Request, res: Response) {
    const { company_id } = req.params
    const { company_name, employer, email } = req.body

    try {
      const service = new Update()
      const result = await service.execute({
        company_id,
        company_name,
        employer,
        email
      })

      if (result instanceof Error) {
        return res.status(400).send({ message: result.message })
      }

      return res.status(200).send({ message: "Company updated successfully!" })
    } catch (error) {
      console.error(error)
      return res.status(500).send({ message: "Internal server error!" })
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params

    try {
      const service = new Delete()
      const result = await service.execute(id)

      if (result instanceof Error) {
        return res.status(400).send({ message: result.message })
      }

      return res.status(200).send({ message: "Company deleted successfully!" })
    } catch (error) {

    }
  }
}

