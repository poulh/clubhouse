import { FilteredMembersModule } from './filtered-members.module';

describe('FilteredMembersModule', () => {
  let filteredMembersModule: FilteredMembersModule;

  beforeEach(() => {
    filteredMembersModule = new FilteredMembersModule();
  });

  it('should create an instance', () => {
    expect(filteredMembersModule).toBeTruthy();
  });
});
