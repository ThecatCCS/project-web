import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VoteGetResponse } from '../../model/vote_get';

@Injectable({
  providedIn: 'root'
})
export class VoteService {
  private apiUrl = 'http://localhost:3000/votes'; // เปลี่ยนเส้นทาง URL ให้ตรงกับ Express.js API ของคุณ

  constructor(private http: HttpClient) {}

  getVotes(): Observable<VoteGetResponse[]> {
    return this.http.get<VoteGetResponse[]>(this.apiUrl);
  }
}
