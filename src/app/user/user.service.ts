import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "./user.model";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private baseUrl: string = "https://chatapi.edwisor.com/api/v1/users";
  private authToken: string =
    "YmQ1Nzk4NGJmYmFjMWQ1NTlhYTdhMWY4OTM5NDg2M2VlZjM4YWMwYjY2MjIyOTBhZmYyNTc5OGQ1NzhlNDc1OTE4ZGY2OTA4NmM3MGVjYTg1NmU5N2Q4MWFiNmJhODYyMzlhYmM5NzViMTgyNmM2NDQ3NmMyNTk5YTQ3OWVmMjY3NA==";

  constructor(private _http: HttpClient) {}

  signUpFunction = (data: User): Observable<any> => {
    const params = new HttpParams()
      .set("firstName", data.firstName)
      .set("lastName", data.lastName)
      .set("email", data.email)
      .set("mobileNumber", data.mobileNumber)
      .set("password", data.password)
      .set("apiKey", data.apiKey);

    return this._http.post(`${this.baseUrl}/signup`, params);
  };

  loginFunction = (data: User): Observable<any> => {
    const params = new HttpParams()
      .set("email", data.email)
      .set("password", data.password);

    return this._http.post(`${this.baseUrl}/login`, params);
  };

  setUserInfo = (data) => {
    localStorage.setItem('userInfo', JSON.stringify(data));
  }

  getUserInfo = () => {
    return JSON.parse(localStorage.getItem('userInfo'));
  }
}
