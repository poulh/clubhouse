import { Observable, of } from 'rxjs';

import { LoginCredentials, LoginContext } from './authentication.service';

export class MockAuthenticationService {

  credentials: LoginCredentials | null = {
    username: 'test',
    token: '123'
  };

  login(context: LoginContext): Observable<LoginCredentials> {
    return of({
      username: context.username,
      token: '123456'
    });
  }

  logout(): Observable<boolean> {
    this.credentials = null;
    return of(true);
  }

  isAuthenticated(): boolean {
    return !!this.credentials;
  }

}
