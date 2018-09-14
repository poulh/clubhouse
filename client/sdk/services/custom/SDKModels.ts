/* tslint:disable */
import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { Event } from '../../models/Event';
import { Client } from '../../models/Client';
import { Account } from '../../models/Account';
import { Member } from '../../models/Member';
import { Checkin } from '../../models/Checkin';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    User: User,
    Event: Event,
    Client: Client,
    Account: Account,
    Member: Member,
    Checkin: Checkin,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}
