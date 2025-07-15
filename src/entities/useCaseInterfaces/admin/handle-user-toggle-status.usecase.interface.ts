
export interface IuserToggleStatusUseCase {
    execute(userId: string, status: string) : Promise<void>
}