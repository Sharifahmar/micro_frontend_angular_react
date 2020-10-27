import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../helper/model/user-model';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  private userDetailsApi: string = 'http://localhost:8081/userDetails';
  private updateUserDetailsApi: string = 'http://localhost:8081/updateUser';
  private imageUploadApi: string = 'http://localhost:8081/imageUpload/userProfile/';


  constructor(private http: HttpClient) { }

  userDetails(payload: any): Observable<UserModel> {
    return this.http.post<UserModel>(this.userDetailsApi, payload);
  }

  updateUserDetails(payload: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(this.updateUserDetailsApi, payload);
  }

  uploadImage(formData: FormData, id: number): Observable<any> {
    return this.http.post<any>(this.imageUploadApi + id, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }
}
