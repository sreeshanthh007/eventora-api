
export interface IAddCategoryUseCase {
    execute(title:string,image:string) : Promise<void>
}
    