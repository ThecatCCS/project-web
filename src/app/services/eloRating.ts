export class Image {
    pictrue_url: string;
    pictrue_p: number;

    constructor( pictrue_url: string, pictrue_p: number) {
        this.pictrue_url = pictrue_url;
        this.pictrue_p = pictrue_p;
    }
}

export class ImageVotingSystem {
    kFactor: number;
    image1: Image;
    image2: Image;

    constructor(image1: Image, image2: Image, kFactor: number) {
        this.image1 = image1;
        this.image2 = image2;
        this.kFactor = kFactor;
    }

    updateEloRating(winner: Image, loser: Image) {
        const expectedScoreWinner = 1 / (1 + Math.pow(10, (loser.pictrue_p - winner.pictrue_p) / 400));
        const expectedScoreLoser = 1 / (1 + Math.pow(10, (winner.pictrue_p - loser.pictrue_p) / 400));

        const actualScoreWinner = 1;
        const actualScoreLoser = 0;

        const newEloRatingWinner = winner.pictrue_p + this.kFactor * (actualScoreWinner - expectedScoreWinner);
        const newEloRatingLoser = loser.pictrue_p + this.kFactor * (actualScoreLoser - expectedScoreLoser);

        winner.pictrue_p = Math.round(newEloRatingWinner);
        loser.pictrue_p = Math.round(newEloRatingLoser);
    }
}
