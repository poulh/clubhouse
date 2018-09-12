import { MemberDetailModule } from './member-detail.module';

describe('MemberDetailModule', () => {
  let memberDetailModule: MemberDetailModule;

  beforeEach(() => {
    memberDetailModule = new MemberDetailModule();
  });

  it('should create an instance', () => {
    expect(memberDetailModule).toBeTruthy();
  });
});
