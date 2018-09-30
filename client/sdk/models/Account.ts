/* tslint:disable */
import {
  Event,
  RegisteredUser,
  Member
} from '../index';

declare var Object: any;
export interface AccountInterface {
  "name": string;
  "creationDate": Date;
  "id"?: any;
  events?: Event[];
  registeredUsers?: RegisteredUser[];
  members?: Member[];
}

export class Account implements AccountInterface {
  "name": string;
  "creationDate": Date;
  "id": any;
  events: Event[];
  registeredUsers: RegisteredUser[];
  members: Member[];
  constructor(data?: AccountInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Account`.
   */
  public static getModelName() {
    return "Account";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Account for dynamic purposes.
  **/
  public static factory(data: AccountInterface): Account{
    return new Account(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'Account',
      plural: 'Accounts',
      path: 'Accounts',
      idName: 'id',
      properties: {
        "name": {
          name: 'name',
          type: 'string'
        },
        "creationDate": {
          name: 'creationDate',
          type: 'Date'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
      },
      relations: {
        events: {
          name: 'events',
          type: 'Event[]',
          model: 'Event',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'accountId'
        },
        registeredUsers: {
          name: 'registeredUsers',
          type: 'RegisteredUser[]',
          model: 'RegisteredUser',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'accountId'
        },
        members: {
          name: 'members',
          type: 'Member[]',
          model: 'Member',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'accountId'
        },
      }
    }
  }
}
