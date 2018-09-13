import { EventCheckinModule } from './event-checkin.module';

describe('EventCheckinModule', () => {
  let eventCheckinModule: EventCheckinModule;

  beforeEach(() => {
    eventCheckinModule = new EventCheckinModule();
  });

  it('should create an instance', () => {
    expect(eventCheckinModule).toBeTruthy();
  });
});
