import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VoteGetResponse } from '../../model/vote_get';
import { Constants } from '../../config/constants';

@Injectable({
  providedIn: 'root'
})
export class VoteService {
  public apiUrl = this.constants.API_ENDPOINT + '/vote'; 
  constructor(private http: HttpClient , private constants : Constants) {}

  getVotes(): Observable<VoteGetResponse[]> {
    return this.http.get<VoteGetResponse[]>(this.apiUrl);
  }
}
