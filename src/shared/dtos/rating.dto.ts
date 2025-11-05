

export interface RatingRequestDTO{
    description:string
    rating:number
}


export interface RatingDTO{
    rating:number
    description:string
    clientId?:string
    createdAt?:string
}

export interface GetAllRatingsWithAverageDTO{
    averageRatings:number
    totalRatings:number
    reviews:RatingDTO[]
}

type EditableFields = Pick<
RatingDTO,
"description" | 
"rating"
>

export type IEditRatingDTO = Partial<EditableFields>
