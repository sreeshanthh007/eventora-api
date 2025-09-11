
import { UseCaseRegistry } from "./usecase.registry";
import { RepositoryRegistry } from "./repository.registry";

export class DependencyInjection {
    static registerAll() : void{
        UseCaseRegistry.registerUseCases();
        RepositoryRegistry.registerRepositories();

    }
}