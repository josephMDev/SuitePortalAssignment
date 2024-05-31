import { Injectable } from '@nestjs/common';
import { Admin } from '@suiteportal/api-interfaces';
import * as low from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';

export interface AdminDB extends Admin {
  id: number;
}

export interface AdminData {
    admins: AdminDB[];
}

const adapter = new FileSync<AdminData>('./db/admins.json')
const db = low(adapter)

db.defaults({ admins: [] }).write();

@Injectable()
export class UsersDao {

  private get collection(): any {
    return db.get('admins');
  }

  constructor() {
    //
  }

  async insertNewAdmin(admin: Admin) {
    const id = { id: this.collection.size().value() + 1 }; //maybe use nanoid here instead
    await this.collection
      .push({
        ...id,
        ...admin,
      })
      .write()
    return id;
  }

  async getAdmin(id: number): Promise<AdminDB> {
    return await this.collection.find({ id }).value();
  }

  async getAdminByUsername(username: string): Promise<AdminDB> {
    return await this.collection.find({ username }).value();
  }
}