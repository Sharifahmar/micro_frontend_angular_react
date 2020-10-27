import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../helper/model/user-model';
import { ApiResponseModel } from '../helper/model/api-response-model';

@Injectable({
  providedIn: 'root'
})
export class DonationAmountService {

  private donationAmountApi: string = 'http://localhost:8081/donationAmount';
  private getAllDonationTypeContributionApi: string = 'http://localhost:8081/donationAmountRepo/search/donationAmountList?value=true';
  private getAllDonationTypeContributionJoinApi: string = 'http://localhost:8081/donarContributionDetails';
  private getDonationTypeContributionDetailsByIdApi: string = 'http://localhost:8081/donarContributionDetails/'
  private donationContributionDetailsDeleteByIdApi: string = 'http://localhost:8081/deleteDonarContributionDetails/'
  private donationContributionDetailsUpdateByIdApi: string = 'http://localhost:8081/updateDonarContributionDetails/'
  constructor(private http: HttpClient) { }

  registerDonationAmount(payload: any): Observable<ApiResponseModel> {
    return this.http.post<ApiResponseModel>(this.donationAmountApi, payload);
  }

  getAllDonarsContributionDetails():Observable<any>{
    return this.http.get<any>(this.getAllDonationTypeContributionApi);
  }

  getAllDonarsContributionDetailsJoin(payload:any): Observable<any> {
    return this.http.post<any>(this.getAllDonationTypeContributionJoinApi,payload);
  }

  getDonarsContributionDetailsById(payload:any): Observable<any> {
    return this.http.post<any>(this.getDonationTypeContributionDetailsByIdApi+payload,'');
  }

  deleteDonationAmount(payload: any): Observable<ApiResponseModel> {
    return this.http.post<ApiResponseModel>(this.donationContributionDetailsDeleteByIdApi, payload);
  }

  updateDonationAmount(payload: any): Observable<ApiResponseModel> {
    return this.http.post<ApiResponseModel>(this.donationContributionDetailsUpdateByIdApi, payload);
  }

}
