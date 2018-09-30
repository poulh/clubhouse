/* tslint:disable */
import {
  Event,
  Member
} from '../index';

declare var Object: any;
export interface CheckinInterface {
  "date": Date;
  "id"?: any;
  "eventId"?: any;
  "memberId"?: any;
  event?: Event;
  member?: Member;
}

export class Checkin implements CheckinInterface {
  "date": Date;
  "id": any;
  "eventId": any;
  "memberId": any;
  event: Event;
  member: Member;
  constructor(data?: CheckinInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Checkin`.
   */
  public static getModelName() {
    return "Checkin";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Checkin for dynamic purposes.
  **/
  public static factory(data: CheckinInterface): Checkin{
    return new Checkin(data);
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
      name: 'Checkin',
      plural: 'checkins',
      path: 'checkins',
      idName: 'id',
      properties: {
        "date": {
          name: 'date',
          type: 'Date'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "eventId": {
          name: 'eventId',
          type: 'any'
        },
        "memberId": {
          name: 'memberId',
          type: 'any'
        },
      },
      relations: {
        event: {
          name: 'event',
          type: 'Event',
          model: 'Event',
          relationType: 'belongsTo',
                  keyFrom: 'eventId',
          keyTo: 'id'
        },
        member: {
          name: 'member',
          type: 'Member',
          model: 'Member',
          relationType: 'belongsTo',
                  keyFrom: 'memberId',
          keyTo: 'id'
        },
      }
    }
  }
}
