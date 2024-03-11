import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { VoteGetResponse } from '../model/vote_get';
import { VoteService } from '../services/api/voteservice';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { pointvote } from '../model/point_vote';
@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './linechart.component.html',
})
export class LineChartComponent implements OnInit {
  vote: VoteGetResponse[] = [];
  public chart: any;
  public pt_id: number = 1;

  constructor(
    private voteService: VoteService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      // this.pt_id = params['pt_id'];
      // console.log(this.pt_id);
      this.pt_id = 4;
    });

    const url = `http://localhost:3000/pictrue/statistics/${this.pt_id}`;
    const body = {};

    this.http.get(url, body).subscribe((response) => {
      // console.log(response);
      let mum = response as pointvote[];
      console.log(mum[0].date);

    });

    // this.voteService.getVotes().subscribe(
    //   (data: VoteGetResponse[]) => {
    //     this.vote = data;
    //     console.log('Vote:', this.vote);
    //     this.createChart();
    //   },
    //   (error) => {
    //     console.error('Error loading votes:', error);
    //   }
    // );
  }

  createChart() {
    if (this.vote && this.vote.length > 0) {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      const filteredVotes = this.vote.filter(
        (vote) =>
          vote.pt_id === this.pt_id &&
          new Date(vote.vote_timestamp) >= oneWeekAgo
      );

      const labels = filteredVotes.map((vote) => vote.vote_timestamp);
      const votePoints = filteredVotes.map((vote) => vote.vote_point);

      console.log('Labels:', labels);
      console.log('Vote Points:', votePoints);

      this.chart = new Chart('MyChart', {
        type: 'bar',

        data: {
          labels: labels,
          datasets: [
            {
              label: 'statict',
              data: votePoints,
              backgroundColor: 'pink',
            },
          ],
        },
        options: {
          aspectRatio: 2.5,
        },
      });
    }
  }
}
