import { MembersModule } from './members.module';

describe('MembersModule', () => {
  let membersModule: MembersModule;

  beforeEach(() => {
    membersModule = new MembersModule();
  });

  it('should create an instance', () => {
    expect(membersModule).toBeTruthy();
  });
});
