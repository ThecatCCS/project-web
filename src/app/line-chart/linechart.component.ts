import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { VoteGetResponse } from '../model/vote_get';
import { VoteService } from '../services/api/voteservice';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { pointget, pointvote } from '../model/point_vote';
import { count, lastValueFrom } from 'rxjs';
import { urlencoded } from 'body-parser';
import { CommonModule } from '@angular/common';
import { Constants } from '../config/constants';
@Component({
  selector: 'app-line-chart',
  standalone: true,
  templateUrl: './linechart.component.html',
  imports: [CommonModule],
})
export class LineChartComponent implements OnInit {
  public chart: any;
  numberValue: pointget[] | undefined;
  pt_id = '';

  constructor(
    private http: HttpClient,
    private activeatedRoute: ActivatedRoute,
    private constants: Constants,
  ) {}
  ngOnInit(): void {
    this.pt_id = this.activeatedRoute.snapshot.paramMap.get('pt_id') || '';
    console.log(this.pt_id,"ไม่ออกหรือป่าว");
    this.getpoint();
    this.createChart();
  }

  async getpoint() {
    const url = this.constants.API_ENDPOINT + `/pictrue/all/${this.pt_id}`;
    const datom = await lastValueFrom(this.http.get(url));
    const pointGets: any[] = datom as pointget[];
    console.log(pointGets[0]);
    const numberValue2 = Number(pointGets[0].initial_score);
    return numberValue2;
  }

  async createChart() {
    const url = this.constants.API_ENDPOINT + `/pictrue/statistics/${this.pt_id}`;
    const body = {};
    const scores: number[] = [];
    const labels: string[] = [];
    const pointValue = await this.getpoint();
    const formattedDates: any = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const dateString = `${year}-${month < 10 ? '0' + month : month}-${
        day < 10 ? '0' + day : day
      }`;
      labels.push(dateString);
      console.log(labels)
    }
    labels.reverse();
    scores[0] = pointValue;
    this.http.get(url, body).subscribe((response) => {
      const data = response as pointvote[];
      if (data && data.length > 0 && data[0].total_score !== undefined) {
        for (let index = 0; index < data.length; index++) {
          const date = new Date(data[index].date);
          const year = date.getFullYear();
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const day = date.getDate().toString().padStart(2, '0');

          const formattedDate = `${year}-${month}-${day}`;

          formattedDates.push(formattedDate);
        }
        console.log(formattedDates)
        let i = 0;
        console.log(labels.length);
        
          for (let index = 0; index < labels.length; index++) {
            console.log(scores);
            if (labels[index] == formattedDates[i]) {
              scores.push(scores[index] + data[i].total_score);
              console.log();
              
              console.log(formattedDates[i])
              console.log(labels[index])
              i = i + 1;
              
            } else {
                scores.push(scores[index]);
            }
           
            
            console.log(index);
            
            
          }
         
      } else {
        for (let index = 0; index < labels.length; index++) {
          scores.push(scores[index]);
        }
      }
      
      const newArray = scores.slice(1);
      console.log(newArray)
      console.log(scores);

      this.chart = new Chart('MyChart', {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'statics',
              data: newArray,
              backgroundColor: 'pink',
            },
          ],
        },
        options: {
          aspectRatio: 2.5,
        },
      });
    });
  }
}
