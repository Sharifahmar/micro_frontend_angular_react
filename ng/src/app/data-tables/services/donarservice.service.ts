import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DonarserviceService {

  private donarApi: string = 'http://localhost:8081/donarsRepo';
  private getAllDonarsApi: string = 'http://localhost:8081/donarsRepo/search/donarList?value=true';

  constructor(private http: HttpClient) { }

  getAllDonars(): Observable<any> {
    return this.http.get<any>(this.getAllDonarsApi);
  }

  getSpecificDonarDetails(id:number): Observable<any> {
    return this.http.get<any>(this.donarApi+"/"+id);
  }

}
