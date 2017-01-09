import { MemberHivePage } from './app.po';

describe('member-hive App', function() {
  let page: MemberHivePage;

  beforeEach(() => {
    page = new MemberHivePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
