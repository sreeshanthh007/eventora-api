

export interface IHandleToggleCategoryUseCase {
    execute(categoryId:string) : Promise<void>
}