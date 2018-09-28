/* tslint:disable */
import {
  Member
} from '../index';

declare var Object: any;
export interface EventInterface {
  "name": string;
  "date": Date;
  "closed": boolean;
  "id"?: number;
  "accountId"?: number;
  members?: Member[];
}

export class Event implements EventInterface {
  "name": string;
  "date": Date;
  "closed": boolean;
  "id": number;
  "accountId": number;
  members: Member[];
  constructor(data?: EventInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Event`.
   */
  public static getModelName() {
    return "Event";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Event for dynamic purposes.
  **/
  public static factory(data: EventInterface): Event{
    return new Event(data);
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
      name: 'Event',
      plural: 'events',
      path: 'events',
      idName: 'id',
      properties: {
        "name": {
          name: 'name',
          type: 'string'
        },
        "date": {
          name: 'date',
          type: 'Date'
        },
        "closed": {
          name: 'closed',
          type: 'boolean',
          default: false
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
        members: {
          name: 'members',
          type: 'Member[]',
          model: 'Member',
          relationType: 'hasMany',
          modelThrough: 'Checkin',
          keyThrough: 'memberId',
          keyFrom: 'id',
          keyTo: 'eventId'
        },
      }
    }
  }
}
