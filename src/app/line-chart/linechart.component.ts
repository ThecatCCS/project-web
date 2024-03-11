import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { VoteGetResponse } from '../model/vote_get';
import { VoteService } from '../services/api/voteservice';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { pointvote } from '../model/point_vote';
import { count } from 'rxjs';
import { urlencoded } from 'body-parser';
@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './linechart.component.html',
})
export class LineChartComponent implements OnInit {
  public chart: any;
 constructor(private http: HttpClient) {}
  ngOnInit(): void {

      

    this.createChart();
    
  }
  createChart(){
    const url =  `http://localhost:3000/pictrue/statistics/${5}`;
    const body = {};
    
    this.http.get(url, body).subscribe((response) => {
      const data = response as pointvote[];
      console.log(data[0].total_score);
  
      const labels = data.map((item) => item.date); 
      console.log(labels);
      
      const scores = data.map((item) => item.total_score); 
      console.log(scores);
  
      // Create the chart inside the subscription callback
      this.chart = new Chart("MyChart", {
        type: 'bar', 
        data: {
          labels: labels, 
          datasets: [{
            label: "statics",
            data: scores,
            backgroundColor: 'pink'
          }]
        },
        options: {
          aspectRatio: 2.5
        }
      });
    });
  }
}