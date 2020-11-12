import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponseModel } from '../helper/model/api-response-model';
import { HttpClient } from '@angular/common/http';
import { DonationType } from '../helper/model/donationType-model';


@Injectable({
  providedIn: 'root'
})
export class DonationTypeService {

  private getAllDonartionTypeApi: string = 'http://localhost:8081/donationTypeRepo/search/donationTypeList?value=true';
  private isDonationTypeExists: string = 'http://localhost:8081/donationType/isDonationTypeExists';
  private donationTypeApi: string = 'http://localhost:8081/donationTypeRepo';
  private donationTypeUpdateApi: string = 'http://localhost:8081/donationType/update';
  private getDonationTypeByIdAndStatusApi: string = 'http://localhost:8081/donationTypeRepo/search/donationTypeByIdAndStatus?value=true&id=';
  private deleteDonationTypeByIdAndStatusApi: string = 'http://localhost:8081/donationType/delete'

  constructor(private http: HttpClient) { }

  getDonationTypeExists(payload: any): Observable<ApiResponseModel> {
    return this.http.post<ApiResponseModel>(this.isDonationTypeExists, payload);
  }

  donationType(payload: any): Observable<DonationType> {
    return this.http.post<DonationType>(this.donationTypeApi, payload);
  }

  getAllDonartionType(): Observable<any> {
    return this.http.get<any>(this.getAllDonartionTypeApi);
  }

  getDonationTypeByIdAndStatus(data: number): Observable<any> {
    return this.http.get<any>(this.getDonationTypeByIdAndStatusApi + data);
  }

  deleteDonationType(payload: DonationType): Observable<ApiResponseModel> {
    return this.http.post<ApiResponseModel>(this.deleteDonationTypeByIdAndStatusApi, payload);
  }

  updateDonationType(payload: any): Observable<ApiResponseModel> {
    return this.http.post<ApiResponseModel>(this.donationTypeUpdateApi, payload);
  }

}
