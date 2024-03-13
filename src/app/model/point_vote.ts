export interface pointvote {
    vote_point: any;
    pt_id: number | undefined;
    vote_timestamp: string | number | Date;
    date:        Date;
    count:       number;
    total_score: number;
}



export interface pointget{
    initial_score: number;
}