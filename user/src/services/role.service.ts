import { AppDataSource } from "../utils/data-source";
import { Role } from "../models/role.entity";

class RoleService {
  private roleRepository = AppDataSource.getRepository(Role);
  async createRole(input: Role): Promise<Role | null> {
    try {
      const newRole = this.roleRepository.create(input);
      await this.roleRepository.save(newRole);
      return newRole;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async updateRole(id: number, input: Role): Promise<Role | null> {
    try {
      await this.roleRepository.update(id, input);
      return await this.roleRepository.findOne({
        where: { id },
      });
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async delete(id: number): Promise<Role | null> {
    try {
      const role = await this.roleRepository.findOne({
        where: { id },
      });
      if (!role) return null;
      await this.roleRepository.delete(id);
      return role;
    } catch {
      return null;
    }
  }

  async get(id: number): Promise<Role | null> {
    try {
      return (
        (await this.roleRepository.findOne({
          where: { id },
        })) ?? null
      );
    } catch {
      return null;
    }
  }

  async getAll(pageNumber: number, pageSize: number): Promise<Role[] | []> {
    try {
      return await this.roleRepository.find({
        skip: (pageNumber - 1) * pageSize,
        take: pageSize,
      });
    } catch (err: any) {
      throw new Error(err);
    }
  }
}

export default new RoleService();
