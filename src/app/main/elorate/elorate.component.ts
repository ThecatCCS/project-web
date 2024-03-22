import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Constants } from '../../config/constants';
import { ImageVotingSystem } from '../../services/eloRating';
@Component({
  selector: 'app-elorate',
  standalone: true,
  imports: [  ],
  templateUrl: './elorate.component.html',
  styleUrl: './elorate.component.scss'
  
})
export class ElorateComponent {

  winner : number = ImageVotingSystem.expectedScoreWinner;
  loser : number = ImageVotingSystem.expectedScoreLoser;


  winnerelo : number = ImageVotingSystem.newEloRatingWinner;
  loserelo : number = ImageVotingSystem.newEloRatingLoser;
    
 www : number =  32 *  (1 - ImageVotingSystem.expectedScoreWinner);
 lll : number =  32 *  (1 - ImageVotingSystem.expectedScoreLoser);
}

