import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponseModel } from '../helper/model/api-response-model';
import { HttpClient } from '@angular/common/http';
import { DonarModel } from '../helper/model/donar-model';



@Injectable({
  providedIn: 'root'
})
export class DonarService {



  private isEmailExists: string = 'http://localhost:8081/donar/checkEmailAvailability';
  private isPhoneNumberExists: string = 'http://localhost:8081/donar/checkPhoneNumberAvailability';
  //private registerDonarApi: string = 'http://localhost:8081/donarsRepo';
  private donarApi: string = 'http://localhost:8081/donarsRepo';
  private updateDonarApi: string = 'http://localhost:8081/donar/update';
  private getAllDonarsApi: string = 'http://localhost:8081/donarsRepo/search/donarList?value=true';
  private getDonarsByIdAndStatusApi: string = 'http://localhost:8081/donarsRepo/search/donarListByIdAndStatus?value=true&id=';
  private deleteDonarApi: string = 'http://localhost:8081/donar/delete';
  private donarSearchCriteriaApi: string = 'http://localhost:8081/donar/donarSearchCriteria';
  private imageUploadApi: string = 'http://localhost:8081/imageUpload/donor/';

  constructor(private http: HttpClient) { }

  getEmailExist(payload: any): Observable<ApiResponseModel> {
    return this.http.post<ApiResponseModel>(this.isEmailExists, payload);
  }

  getPhoneNumberExist(payload: any): Observable<ApiResponseModel> {
    return this.http.post<ApiResponseModel>(this.isPhoneNumberExists, payload);
  }

  registerDonar(payload: DonarModel): Observable<ApiResponseModel> {
    return this.http.post<ApiResponseModel>(this.donarApi, payload);
  }

  getAllDonars(): Observable<any> {
    return this.http.get<any>(this.getAllDonarsApi);
  }

  /* getSpecificDonarDetails(id:number): Observable<any> {
     return this.http.get<any>(this.donarApi+"/"+id);
   }*/

  getDonarsByIdAndStatus(data: number): Observable<any> {
    return this.http.get<any>(this.getDonarsByIdAndStatusApi + data);
  }

  deleteDonar(payload: DonarModel): Observable<ApiResponseModel> {
    return this.http.post<ApiResponseModel>(this.deleteDonarApi, payload);
  }

  updateDonar(payload: DonarModel): Observable<any> {
    return this.http.post<any>(this.updateDonarApi, payload);
  }

  donarSearchCriteria(payload: any): Observable<any> {
    return this.http.post<any>(this.donarSearchCriteriaApi, payload);
  }


  uploadImage(formData: FormData, id: number): Observable<any> {
    return this.http.post<any>(this.imageUploadApi + id, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  genericGetService(url:string): Observable<any> {
    return this.http.get<any>(url);
  }


}
