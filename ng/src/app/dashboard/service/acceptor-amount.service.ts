import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponseModel } from '../helper/model/api-response-model';

@Injectable({
  providedIn: 'root'
})
export class AcceptorAmountService {

  private donationAmountApi: string = 'http://localhost:8081/acceptorAmount';
  private getAllDonationTypeContributionApi: string = 'http://localhost:8081/donationAmountRepo/search/donationAmountList?value=true';
  private getAllAcceptorTypeContributionJoinApi: string = 'http://localhost:8081/acceptorContributionDetails';
  private getAcceptorDonationDetailsByIdApi: string = 'http://localhost:8081/acceptorDonationDetails/'
  private donationContributionDetailsDeleteByIdApi: string = 'http://localhost:8081/deleteDonarContributionDetails/'
  private donationContributionDetailsUpdateByIdApi: string = 'http://localhost:8081/updateAcceptorDonationDetails/'
  constructor(private http: HttpClient) { }

  registerDonationAmount(payload: any): Observable<ApiResponseModel> {
    return this.http.post<ApiResponseModel>(this.donationAmountApi, payload);
  }

  getAllDonarsContributionDetails(): Observable<any> {
    return this.http.get<any>(this.getAllDonationTypeContributionApi);
  }

  getAllAcceptorContributionDetailsJoin(payload: any): Observable<any> {
    return this.http.post<any>(this.getAllAcceptorTypeContributionJoinApi, payload);
  }

  getAcceptorDonationDetailsById(payload: any): Observable<any> {
    return this.http.post<any>(this.getAcceptorDonationDetailsByIdApi + payload, '');
  }

  deleteDonationAmount(payload: any): Observable<ApiResponseModel> {
    return this.http.post<ApiResponseModel>(this.donationContributionDetailsDeleteByIdApi, payload);
  }

  updateDonationAmount(payload: any): Observable<ApiResponseModel> {
    return this.http.post<ApiResponseModel>(this.donationContributionDetailsUpdateByIdApi, payload);
  }

}
