/* tslint:disable */
import {
  Event
} from '../index';

declare var Object: any;
export interface MemberInterface {
  "firstName"?: string;
  "lastName"?: string;
  "email": string;
  "memberLevel"?: string;
  "homePhone"?: string;
  "mobilePhone"?: string;
  "workPhone"?: string;
  "otherPhone"?: string;
  "id"?: any;
  "accountId"?: any;
  "created"?: Date;
  "modified"?: Date;
  events?: Event[];
}

export class Member implements MemberInterface {
  "firstName": string;
  "lastName": string;
  "email": string;
  "memberLevel": string;
  "homePhone": string;
  "mobilePhone": string;
  "workPhone": string;
  "otherPhone": string;
  "id": any;
  "accountId": any;
  "created": Date;
  "modified": Date;
  events: Event[];
  constructor(data?: MemberInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Member`.
   */
  public static getModelName() {
    return "Member";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Member for dynamic purposes.
  **/
  public static factory(data: MemberInterface): Member{
    return new Member(data);
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
      name: 'Member',
      plural: 'members',
      path: 'members',
      idName: 'id',
      properties: {
        "firstName": {
          name: 'firstName',
          type: 'string'
        },
        "lastName": {
          name: 'lastName',
          type: 'string'
        },
        "email": {
          name: 'email',
          type: 'string'
        },
        "memberLevel": {
          name: 'memberLevel',
          type: 'string'
        },
        "homePhone": {
          name: 'homePhone',
          type: 'string'
        },
        "mobilePhone": {
          name: 'mobilePhone',
          type: 'string'
        },
        "workPhone": {
          name: 'workPhone',
          type: 'string'
        },
        "otherPhone": {
          name: 'otherPhone',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "accountId": {
          name: 'accountId',
          type: 'any'
        },
        "created": {
          name: 'created',
          type: 'Date',
          default: new Date(0)
        },
        "modified": {
          name: 'modified',
          type: 'Date',
          default: new Date(0)
        },
      },
      relations: {
        events: {
          name: 'events',
          type: 'Event[]',
          model: 'Event',
          relationType: 'hasMany',
          modelThrough: 'Checkin',
          keyThrough: 'eventId',
          keyFrom: 'id',
          keyTo: 'memberId'
        },
      }
    }
  }
}
