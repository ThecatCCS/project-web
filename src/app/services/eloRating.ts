export class Image {
  pictrue_url: string;
  pictrue_p: number;

  constructor(pictrue_url: string, pictrue_p: number) {
    this.pictrue_url = pictrue_url;
    this.pictrue_p = pictrue_p;
  }
}

export class ImageVotingSystem {
  kFactor: number;
  image1: Image;
  image2: Image;
  static image1: number;
  static image2: number;
  static expectedScoreWinner: number;
  static expectedScoreLoser: number;
  static newEloRatingoldWinner: number;
  static newEloRatingoldloser: number;
  static newEloRatingWinner: number;
  static newEloRatingLoser: number;
  constructor(image1: Image, image2: Image) {
    this.image1 = image1;
    this.image2 = image2;
    this.kFactor = 32;
  }

  updateEloRating(winner: Image, loser: Image) {
    ImageVotingSystem.expectedScoreWinner =
      1 / (1 + Math.pow(10, (loser.pictrue_p - winner.pictrue_p) / 400));
    ImageVotingSystem.expectedScoreLoser =
      1 / (1 + Math.pow(10, (winner.pictrue_p - loser.pictrue_p) / 400));

    ImageVotingSystem.newEloRatingoldWinner = winner.pictrue_p;
    ImageVotingSystem.newEloRatingoldloser = loser.pictrue_p;
    ImageVotingSystem.newEloRatingWinner =
      winner.pictrue_p +
      this.kFactor * (1 - ImageVotingSystem.expectedScoreWinner);
    ImageVotingSystem.newEloRatingLoser =
      loser.pictrue_p +
      this.kFactor * (0 - ImageVotingSystem.expectedScoreLoser);

    winner.pictrue_p = Math.round(ImageVotingSystem.newEloRatingWinner);
    loser.pictrue_p = Math.round(ImageVotingSystem.newEloRatingLoser);
  }
}
