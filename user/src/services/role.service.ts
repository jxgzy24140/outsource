import { AppDataSource } from "../utils/data-source";
import { Role } from "../models/role.entity";
import { Like } from "typeorm";
import { CreateOrUpdateRoleInputDto, RoleDto } from "../dtos/role";
import mapper from "../utils/autoMapper";

class RoleService {
  private roleRepository = AppDataSource.getRepository(Role);
  async createRole(input: Role): Promise<Role | null> {
    try {
      const newRole = this.roleRepository.create(input);
      newRole.createdDate = new Date();
      newRole.isDeleted = false;
      await this.roleRepository.save(newRole);
      return newRole;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async updateRole(
    id: number,
    input: CreateOrUpdateRoleInputDto
  ): Promise<RoleDto | null> {
    try {
      var entity = await this.roleRepository.findOne({
        where: { id },
      });
      if (entity == null) return null;

      entity.roleName = input.roleName;
      entity.updatedDate = new Date();
      await this.roleRepository.update(id, entity);

      return mapper.map(entity, Role, RoleDto);
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async delete(id: number) {
    try {
      const entity = await this.roleRepository.findOne({
        where: { id },
      });
      if (!entity) return null;
      entity.isDeleted = true;
      entity.updatedDate = new Date();
      await this.roleRepository.update(id, entity);
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

  async getAll() {
    try {
      return await this.roleRepository.find({});
    } catch (err: any) {
      throw new Error(err);
    }
  }
}

export default new RoleService();
