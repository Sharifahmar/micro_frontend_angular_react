import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponseModel } from 'app/helper/model/api-response-model';
import { HttpClient } from '@angular/common/http';
import { DonarModel } from '../../../helper/model/donar-model';


@Injectable({
  providedIn: 'root'
})
export class DonarService {

  private isEmailExists: string = 'http://localhost:8081/donar/checkEmailAvailability';
  private isPhoneNumberExists: string = 'http://localhost:8081/donar/checkPhoneNumberAvailability';
  private registerDonarApi: string = 'http://localhost:8081/donarsRepo';


  constructor(private http: HttpClient) { }

  getEmailExist(payload: any): Observable<ApiResponseModel> {
    return this.http.post<ApiResponseModel>(this.isEmailExists, payload);
  }

  getPhoneNumberExist(payload: any): Observable<ApiResponseModel> {
    return this.http.post<ApiResponseModel>(this.isPhoneNumberExists, payload);
  }

  registerDonar(payload: DonarModel): Observable<ApiResponseModel> {
    return this.http.post<ApiResponseModel>(this.registerDonarApi, payload);
  }
}
