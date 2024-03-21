
export class Image {
    pictrue_url: string;
    pictrue_p: number;

    constructor( pictrue_url: string, pictrue_p: number) {
        this.pictrue_url = pictrue_url;
        this.pictrue_p = pictrue_p;
        console.log(this.pictrue_url,"test url");
        console.log( this.pictrue_p,"old point");
    
    }
   
}


export class ImageVotingSystem {
    kFactor: number;
    image1: Image;
    image2: Image;

    static expectedScoreWinner : number;
    static expectedScoreLoser : number;

    static newEloRatingWinner : number;
    static newEloRatingLoser : number;
    constructor(image1: Image, image2: Image) {
        this.image1 = image1;
        this.image2 = image2;
        this.kFactor = 32;
       

    }

    updateEloRating(winner: Image, loser: Image) {
        ImageVotingSystem. expectedScoreWinner = 1 / (1 + Math.pow(10, (loser.pictrue_p - winner.pictrue_p) / 400));
        ImageVotingSystem. expectedScoreLoser = 1 / (1 + Math.pow(10, (winner.pictrue_p - loser.pictrue_p) / 400));
        console.log("ขนะะ",ImageVotingSystem.expectedScoreWinner);
        console.log("แพ้",ImageVotingSystem.expectedScoreLoser);


        ImageVotingSystem. newEloRatingWinner = winner.pictrue_p + this.kFactor * (1 - ImageVotingSystem.expectedScoreWinner);
        ImageVotingSystem. newEloRatingLoser = loser.pictrue_p + this.kFactor * (0 - ImageVotingSystem.expectedScoreLoser);
        console.log(this.kFactor * (1 - ImageVotingSystem.expectedScoreWinner));
        console.log(this.kFactor * (0 - ImageVotingSystem.expectedScoreLoser));
        
        winner.pictrue_p = Math.round(ImageVotingSystem.newEloRatingWinner);
        loser.pictrue_p = Math.round(ImageVotingSystem.newEloRatingLoser);
        console.log("คนชนะ",ImageVotingSystem.newEloRatingWinner);
        console.log("คนแพ้",ImageVotingSystem.newEloRatingLoser)
       
    }
}

