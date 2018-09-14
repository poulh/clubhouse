import { MemberImportModule } from './member-import.module';

describe('MemberImportModule', () => {
  let memberImportModule: MemberImportModule;

  beforeEach(() => {
    memberImportModule = new MemberImportModule();
  });

  it('should create an instance', () => {
    expect(memberImportModule).toBeTruthy();
  });
});
