import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MaintenanceRequest } from '@suiteportal/api-interfaces';

export interface MaintenanceRequestWithId extends MaintenanceRequest {
    // The id of the request
    id?: string;
    // The time the request was submitted
    submittedAt?: string; //convert to string;
    // The status of the request
    status?: 'open' | 'closed';
}

@Injectable({
    providedIn: 'root',
})


export class UserServices {
    readonly url = 'http://localhost:3333/api';

    constructor(private http: HttpClient) {}

    //for logging in admin
    login(username: string, password: string): Observable<any> {
        return this.http.post<any>(this.url + '/admin/login/', {
            username: username,
            password: password,
        });
    }

    refreshToken(token: any): Observable<any> {
        return this.http.post<any>(this.url + '/refreshToken/', { token });
    }

    // GENERAL USER post maintennace request to db if all fields are valid
    postMaintRequest(request: MaintenanceRequest): Observable<any> {
        // format the post into an http body
        return this.http.post<any>(this.url + '/maintenance-requests/', request,  { responseType: 'text' as 'json' });
    }

    // ADMIN USER, gets all open main. requests
    adminGetRequests(): Observable<MaintenanceRequestWithId[]> {
        return this.http.get<MaintenanceRequestWithId[]>(
            this.url + '/maintenance-requests/'
        );
    }


    // ADMIN USER, gets one open main. requests by ID
    adminGetRequestByID(request : MaintenanceRequestWithId): Observable<void> {
        return this.http.get<void>(
            this.url + '/maintenance-requests/' + request.id
        );
    }

    // ADMIN USER, closes a specific request by ID
    adminCloseByID(request : MaintenanceRequestWithId): Observable<void> {
        return this.http.put<void>(
            this.url + '/maintenance-requests/' + request.id + '/close', request
        );
    }

}
