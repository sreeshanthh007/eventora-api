

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

type EditableFields = Pick<
RatingDTO,
"description" | 
"rating"
>

export type IEditRatingDTO = Partial<EditableFields>
