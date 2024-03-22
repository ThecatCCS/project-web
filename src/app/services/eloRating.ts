export class Image {
    pictrue_url: string;
    pictrue_p: number;

    constructor( pictrue_url: string, pictrue_p: number) {
        this.pictrue_url = pictrue_url;
        this.pictrue_p = pictrue_p;
        console.log(this.pictrue_url,"test url");
        console.log( this.pictrue_p,"test p");
    }
}

export class ImageVotingSystem {
    kFactor: number;
    image1: Image;
    image2: Image;
    static expectedScoreWinner: number;
    static expectedScoreLoser: number;

    constructor(image1: Image, image2: Image) {
        this.image1 = image1;
        this.image2 = image2;
        this.kFactor = 32;
       

    }

    updateEloRating(winner: Image, loser: Image) {
        ImageVotingSystem.expectedScoreWinner = 1 / (1 + Math.pow(10, (this.image2.pictrue_p - this.image1.pictrue_p) / 400));
        ImageVotingSystem.expectedScoreLoser = 1 / (1 + Math.pow(10, (this.image1.pictrue_p - this.image2.pictrue_p) / 400));
        console.log("ขนะะ",ImageVotingSystem.expectedScoreWinner);
        console.log("แพ้",ImageVotingSystem.expectedScoreLoser);
        const newEloRatingWinner = winner.pictrue_p + this.kFactor * (1 - ImageVotingSystem.expectedScoreWinner);
        const newEloRatingLoser = loser.pictrue_p + this.kFactor * (0 - ImageVotingSystem.expectedScoreLoser);

        console.log("ชนะ",winner.pictrue_p + this.kFactor * (1 - ImageVotingSystem.expectedScoreWinner));
        console.log("แพ้ ",loser.pictrue_p + this.kFactor * (0 - ImageVotingSystem.expectedScoreLoser));


        winner.pictrue_p = Math.round(newEloRatingWinner);
        loser.pictrue_p = Math.round(newEloRatingLoser);
       
    }
}

