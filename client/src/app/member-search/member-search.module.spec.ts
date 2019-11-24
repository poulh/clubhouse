import { MemberSearchModule } from './member-search.module';

describe('MemberSearchModule', () => {
  let memberSearchModule: MemberSearchModule;

  beforeEach(() => {
    memberSearchModule = new MemberSearchModule();
  });

  it('should create an instance', () => {
    expect(memberSearchModule).toBeTruthy();
  });
});
