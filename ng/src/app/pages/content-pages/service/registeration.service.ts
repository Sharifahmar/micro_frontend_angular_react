import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponseModel } from '../../../helper/model/api-response-model';
import { UserModel } from '../../../helper/model/user-model';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private registerUserApi: string = 'http://localhost:8081/registerUser';

  
  constructor(private http: HttpClient) { }


  registerUser(payload: UserModel): Observable<ApiResponseModel> {
    return this.http.post<ApiResponseModel>(this.registerUserApi, payload);
  }

 
}
