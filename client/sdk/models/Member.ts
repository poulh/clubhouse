/* tslint:disable */
import {
  Event
} from '../index';

declare var Object: any;
export interface MemberInterface {
  "firstName": string;
  "lastName": string;
  "email"?: string;
  "cellPhone"?: string;
  "id"?: number;
  "accountId"?: number;
  events?: Event[];
}

export class Member implements MemberInterface {
  "firstName": string;
  "lastName": string;
  "email": string;
  "cellPhone": string;
  "id": number;
  "accountId": number;
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
        "cellPhone": {
          name: 'cellPhone',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "accountId": {
          name: 'accountId',
          type: 'number'
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
