import { Injectable } from '@nestjs/common';
import { Admin } from '@suiteportal/api-interfaces';
import { UsersDao, AdminDB } from './users.dao';

@Injectable()
export class UsersService {
  /**
  * Creates an instance of the UsersService. 
  *       
  * @param usersDao The data access object for users.
  * @returns A new instance of the UsersService.
  */
  constructor(
    private readonly usersDao: UsersDao,
  ) {}

  async createAdmin(admin: Admin) {
    // Create a new admin.
    return await this.usersDao.insertNewAdmin(admin);
  }

  async getAdmin(id: number): Promise<AdminDB> {
    // Get an admin by id.
    return await this.usersDao.getAdmin(id);
  }

  async getAdminByUsername(username: string): Promise<AdminDB> {
    // Get an admin by username.
    return await this.usersDao.getAdminByUsername(username);
  }
}

