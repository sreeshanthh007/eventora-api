"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DependencyInjection = void 0;
const usecase_registry_1 = require("./usecase.registry");
const repository_registry_1 = require("./repository.registry");
const controller_registry_1 = require("./controller.registry");
class DependencyInjection {
    static registerAll() {
        usecase_registry_1.UseCaseRegistry.registerUseCases();
        repository_registry_1.RepositoryRegistry.registerRepositories();
        controller_registry_1.ControllerRegistry.registerControllers();
    }
}
exports.DependencyInjection = DependencyInjection;
