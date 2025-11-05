

export interface IRemoveReviewUseCase{
    execute(reviewId:string) : Promise<void>
}