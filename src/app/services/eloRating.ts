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

    constructor(image1: Image, image2: Image) {
        this.image1 = image1;
        this.image2 = image2;
        this.kFactor = 15;
    }

    updateEloRating(winner: Image, loser: Image) {
        const expectedScoreWinner = 1 / (1 + Math.pow(10, (loser.pictrue_p - winner.pictrue_p) / 400));
        const expectedScoreLoser = 1 / (1 + Math.pow(10, (winner.pictrue_p - loser.pictrue_p) / 400));

        const newEloRatingWinner = winner.pictrue_p + this.kFactor * (1 - expectedScoreWinner);
        const newEloRatingLoser = loser.pictrue_p + this.kFactor * (0 - expectedScoreLoser);

        winner.pictrue_p = Math.round(newEloRatingWinner);
        loser.pictrue_p = Math.round(newEloRatingLoser);
    }
}

