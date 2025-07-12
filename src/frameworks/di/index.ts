
import { UseCaseRegistry } from "./usecase.registry";
import { RepositoryRegistry } from "./repository.registry";
import { ControllerRegistry } from "./controller.registry";

export class DependencyInjection {
    static registerAll() : void{
        UseCaseRegistry.registerUseCases();
        RepositoryRegistry.registerRepositories();
        ControllerRegistry.registerControllers()

    }
}