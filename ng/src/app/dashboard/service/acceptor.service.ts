import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponseModel } from '../helper/model/api-response-model';
import { HttpClient } from '@angular/common/http';
import { DonarModel } from '../helper/model/donar-model';
import { AcceptorModel } from '../helper/model/acceptor-model';


@Injectable({
  providedIn: 'root'
})
export class AcceptorService {



  private isEmailExists: string = 'http://localhost:8081/acceptor/checkEmailAvailability';
  private isPhoneNumberExists: string = 'http://localhost:8081/acceptor/checkPhoneNumberAvailability';
  //private registerDonarApi: string = 'http://localhost:8081/donarsRepo';
  private acceptorApi: string = 'http://localhost:8081/acceptorRepo';
  private updateAcceptorApi: string = 'http://localhost:8081/acceptor/update';
  private getAllAcceptorsApi: string = 'http://localhost:8081/acceptorRepo/search/acceptorList?value=true';
  private getAcceptorsByIdAndStatusApi: string = 'http://localhost:8081/acceptorRepo/search/acceptorIdByIdAndStatus?value=true&id=';
  private deleteAcceptorApi: string = 'http://localhost:8081/acceptor/delete';
  private acceptorSearchCriteriaApi: string = 'http://localhost:8081/acceptor/acceptorSearchCriteria';
  private deleteAcceptorDonationApi: string = 'http://localhost:8081/deleteAcceptorDonationDetails';
  private imageUploadApi: string = 'http://localhost:8081/imageUpload/acceptor/';

  constructor(private http: HttpClient) { }

  getEmailExist(payload: any): Observable<ApiResponseModel> {
    return this.http.post<ApiResponseModel>(this.isEmailExists, payload);
  }

  getPhoneNumberExist(payload: any): Observable<ApiResponseModel> {
    return this.http.post<ApiResponseModel>(this.isPhoneNumberExists, payload);
  }

  registerAcceptor(payload: DonarModel): Observable<ApiResponseModel> {
    return this.http.post<ApiResponseModel>(this.acceptorApi, payload);
  }

  getAllAcceptor(): Observable<any> {
    return this.http.get<any>(this.getAllAcceptorsApi);
  }

  /* getSpecificDonarDetails(id:number): Observable<any> {
     return this.http.get<any>(this.donarApi+"/"+id);
   }*/

  getAcceptorsByIdAndStatus(data: number): Observable<any> {
    return this.http.get<any>(this.getAcceptorsByIdAndStatusApi + data);
  }

  deleteAcceptor(payload: AcceptorModel): Observable<ApiResponseModel> {
    return this.http.post<ApiResponseModel>(this.deleteAcceptorApi, payload);
  }

  deleteAcceptorDonation(payload: AcceptorModel): Observable<ApiResponseModel> {
    return this.http.post<ApiResponseModel>(this.deleteAcceptorDonationApi, payload);
  }
  updateAcceptor(payload: AcceptorModel): Observable<any> {
    return this.http.post<any>(this.updateAcceptorApi, payload);
  }

  acceptorSearchCriteria(payload: AcceptorModel): Observable<any> {
    return this.http.post<any>(this.acceptorSearchCriteriaApi, payload);
  }

  uploadImage(formData: FormData, id: number): Observable<any> {
    return this.http.post<any>(this.imageUploadApi + id, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

}
