import { FullnamePipe } from './fullname.pipe';
import {User} from "../../../user/models/user.model";

describe('FullnamePipe', () => {
  it('create an instance', () => {
    const pipe = new FullnamePipe();
    expect(pipe).toBeTruthy();
  });

  it('tranforms user into fullname', () => {
    const pipe = new FullnamePipe();
    const user: User = {boats: [], id: 0, firstName: "Marie", lastName: "Cray", email: "mariecray@test.com", password: "secretPassword1"};
    expect(pipe.transform(user)).toEqual("Marie, Cray");
  });
});
