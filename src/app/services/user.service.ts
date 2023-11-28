import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRequest } from '../models/user-request';
import { Observable } from 'rxjs';
import { UserResponse } from '../models/user-response';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userApi = `${environment.userManangerApiUrl}/api/users`;

  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<UserResponse[]> {
    const url = `${this.userApi}`;
    return this.httpClient.get<UserResponse[]>(url);
  }

  registerUser(request: UserRequest): Observable<number> {
    const url = `${this.userApi}`;
    return this.httpClient.post<number>(url, request);
  }

  editUser(request: UserRequest): Observable<UserResponse> {
    const url = `${this.userApi}`;
    return this.httpClient.put<UserResponse>(url, request);
  }

  deleteUser(userId: string): Observable<number> {
    const url = `${this.userApi}/${userId}`;
    return this.httpClient.delete<number>(url);
  }

  getUserById(userId: string): Observable<UserResponse> {
    const url = `${this.userApi}/${userId}`;
    return this.httpClient.get<UserResponse>(url);
  }
}
