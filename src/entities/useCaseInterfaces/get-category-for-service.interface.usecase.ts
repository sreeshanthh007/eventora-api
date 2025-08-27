

export interface IGetAllCategoryForServiceUseCase {
    execute() :  Promise<{categoryId: string; title: string }[]>
}