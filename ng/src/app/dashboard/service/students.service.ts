import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponseModel } from '../helper/model/api-response-model';
import { HttpClient } from '@angular/common/http';
import { DonarModel } from '../helper/model/donar-model';
import { StudentModel } from '../helper/model/student-model';


@Injectable({
  providedIn: 'root'
})
export class StudentService {



  private isAadharNumberExists: string = 'http://localhost:8081/student/checkAadharNumberAvailability';
  private isPhoneNumberExists: string = 'http://localhost:8081/donar/checkPhoneNumberAvailability';
  //private registerDonarApi: string = 'http://localhost:8081/donarsRepo';
  private studentApi: string = 'http://localhost:8081/studentsRepo';
  private updateStudentApi: string = 'http://localhost:8081/student/update';
  private getAllStudentsApi: string = 'http://localhost:8081/studentsRepo/search/studentList?value=true';
  private getStudentByIdAndStatus: string = 'http://localhost:8081/studentsRepo/search/studentIdByIdAndStatus?value=true&id=';
  private deleteStudentApi: string = 'http://localhost:8081/student/delete';
  private studentSearchCriteriaApi: string ='http://localhost:8081/student/studentSearchCriteria';

  constructor(private http: HttpClient) { }

  getPhoneNumberExist(payload: any): Observable<ApiResponseModel> {
    return this.http.post<ApiResponseModel>(this.isPhoneNumberExists, payload);
  }

  registerStudent(payload: StudentModel): Observable<ApiResponseModel> {
    return this.http.post<ApiResponseModel>(this.studentApi, payload);
  }

  getAllStudents(): Observable<any> {
    return this.http.get<any>(this.getAllStudentsApi);
  }

  /* getSpecificDonarDetails(id:number): Observable<any> {
     return this.http.get<any>(this.donarApi+"/"+id);
   }*/

  getStudentsByIdAndStatus(data: number): Observable<any> {
    return this.http.get<any>(this.getStudentByIdAndStatus + data);
  }

  deleteStudent(payload: StudentModel): Observable<ApiResponseModel> {
    return this.http.post<ApiResponseModel>(this.deleteStudentApi, payload);
  }

  updateStudent(payload: StudentModel): Observable<ApiResponseModel> {
    return this.http.post<ApiResponseModel>(this.updateStudentApi, payload);
  }

  getAadhaarNumberExist(payload: StudentModel): Observable<ApiResponseModel> {
    return this.http.post<ApiResponseModel>(this.isAadharNumberExists, payload);
  }

  studentSearchCriteria(payload: StudentModel): Observable<any> {
    return this.http.post<any>(this.studentSearchCriteriaApi, payload);
  }

}