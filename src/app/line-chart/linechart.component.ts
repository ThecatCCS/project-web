import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { VoteGetResponse } from '../model/vote_get';
import { VoteService } from '../services/api/voteservice';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { pointvote } from '../model/point_vote';
import { count } from 'rxjs';
import { urlencoded } from 'body-parser';
@Component({
  selector: 'app-line-chart',
  standalone: true,
  templateUrl: './linechart.component.html',
})
export class LineChartComponent implements OnInit {
  public chart: any;
  pt_id = '';
  constructor(private http: HttpClient, private route: ActivatedRoute) {}
  ngOnInit() {
    this.pt_id = this.route.snapshot.paramMap.get('id') || '';
    console.log('ออกแล้วจ้า :', this.pt_id);

    this.createChart();
  }
  createChart() {
    const url = `http://localhost:3000/pictrue/statistics/${this.pt_id}`;
    const body = {};
    const scores: number[] = [];
    const labels: string[] = [];
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
    }

    this.http.get(url, body).subscribe((response) => {
      const data = response as pointvote[];
      console.log(data[0].total_score);
      console.log(data);
      console.log(data[0].date);
      for (let index = 0; index < data.length; index++) {
        const date = new Date(data[index].date);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;

        formattedDates.push(formattedDate);
      }
      formattedDates.reverse();
      console.log(labels);
      console.log(formattedDates);
      let i = 0;

      for (let index = 0; index < labels.length; index++) {
        if (labels[index] === formattedDates[i]) {
          scores.push(data[i].total_score);
          i = i + 1;
        } else {
          scores.push(500);
        }
      }
      console.log(scores);

      this.chart = new Chart('MyChart', {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'statics',
              data: scores,
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
