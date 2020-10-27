import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginModel } from '../helper/model/login-model';
import { ApiResponseModel } from '../helper/model/api-response-model';
import { JwtResponseModel } from '../helper/model/jwt-response-model';

@Injectable({
  providedIn: 'root'
})
export class LoginAuthService {

  private isEmailExists: string = 'http://localhost:8081/user/checkEmailAvailability';
  private generateToken: string = 'http://localhost:8081/loginToken';
  private isPhoneNumberExists: string = 'http://localhost:8081/user/checkPhoneNumberAvailability';
  
  constructor(private http: HttpClient) { }


  getEmailExist(payload: LoginModel): Observable<ApiResponseModel> {
    return this.http.post<ApiResponseModel>(this.isEmailExists, payload);
  }

  getToken(payload: LoginModel): Observable<JwtResponseModel> {
    return this.http.post<JwtResponseModel>(this.generateToken, payload);
  }

  getPhoneNumberExist(payload: LoginModel): Observable<ApiResponseModel> {
    return this.http.post<ApiResponseModel>(this.isPhoneNumberExists, payload);
  }
}
