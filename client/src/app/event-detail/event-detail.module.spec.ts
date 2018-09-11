import { EventDetailsModule } from '@app/event-detail/event-detail.module';

describe('EventDetailsModule', () => {
  let eventDetailsModule: EventDetailsModule;

  beforeEach(() => {
    eventDetailsModule = new EventDetailsModule();
  });

  it('should create an instance', () => {
    expect(eventDetailsModule).toBeTruthy();
  });
});
