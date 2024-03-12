import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { VoteGetResponse } from '../model/vote_get';
import { VoteService } from '../services/api/voteservice';
import { ActivatedRoute } from '@angular/router';
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
 constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.createChart();
  }
  createChart(){
    const url =  `http://localhost:3000/pictrue/statistics/${5}`;
    const body = {};

    const labels: string[] = [];

for (let i = 0; i < 7; i++) {
  const date = new Date(); // สร้างวัตถุ Date สำหรับวันปัจจุบัน
  date.setDate(date.getDate() - i); // ลบจำนวนวันที่ต้องการ (7 วันย้อนหลัง)

  // ดึงข้อมูลวัน เดือน และปี
  const day = date.getDate();
  const month = date.getMonth() + 1; // เริ่มนับเดือนที่ 1
  const year = date.getFullYear();

  // สร้างข้อความเป็นรูปแบบวัน เดือน ปี
  const dateString = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;

  labels.push(dateString); // เพิ่มข้อมูลลงในอาร์เรย์ labels
  console.log(labels[0]);
}

    this.http.get(url, body).subscribe((response) => {
      const data = response as pointvote[];
      console.log(data[0].total_score);
      console.log(data[0].date)

      const date = new Date(data[0].date);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // เพิ่มศูนย์ด้านหน้าหากมีเพียงหนึ่งหลัก
      const day = date.getDate().toString().padStart(2, '0'); // เพิ่มศูนย์ด้านหน้าหากมีเพียงหนึ่งหลัก

      
      
      const formattedDate = `${year}-${month}-${day}`;
      console.log(formattedDate); // Output: "2024-03-10"

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