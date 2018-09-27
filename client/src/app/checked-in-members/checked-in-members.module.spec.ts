import { CheckedInMembersModule } from '@app/checked-in-members/checked-in-members.module';

describe('CheckedInMembersModule', () => {
  let checkedinMembersModule: CheckedInMembersModule;

  beforeEach(() => {
    checkedinMembersModule = new CheckedInMembersModule();
  });

  it('should create an instance', () => {
    expect(checkedinMembersModule).toBeTruthy();
  });
});
