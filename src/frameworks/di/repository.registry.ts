import { container } from "tsyringe";

import { IClientRepository } from "@entities/repositoryInterfaces/client/client-repository.interface";
import { ClientRepository } from "interfaceAdpaters/repositories/client/cllient.repository";
import { IVendorRepository } from "@entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { VendorRepository } from "interfaceAdpaters/repositories/vendor/vendor.repository";
import { IAdminRepository } from "@entities/repositoryInterfaces/admin/admin-repository-interface";
import { AdminRepository } from "interfaceAdpaters/repositories/admin/admin.repository";
import { ICategoryRepository } from "@entities/repositoryInterfaces/admin/category.interface";
import { CategoryRepository } from "interfaceAdpaters/repositories/common/category.repository";
import { IEventRepository } from "@entities/repositoryInterfaces/vendor/event/event.repository.interface";
import { EventRepository } from "interfaceAdpaters/repositories/event/event.repository.";
import { INotificationRepository } from "@entities/repositoryInterfaces/notification/notification.repository.interface";
import { NotificationRepository } from "interfaceAdpaters/repositories/notification/notification.repository";
import { IServiceRepository } from "@entities/repositoryInterfaces/vendor/service/service.repository.interface";
import { ServiceRepository } from "interfaceAdpaters/repositories/common/service.repository";
import { IWalletRepository } from "@entities/repositoryInterfaces/wallet/wallet.repository.interface";
import { WalletRepository } from "interfaceAdpaters/repositories/wallet/wallet.repository";
import { ITicketRepository } from "@entities/repositoryInterfaces/ticket/ticket-repository-interface";
import { TicketRepository } from "interfaceAdpaters/repositories/ticket/ticket-repository";

export class RepositoryRegistry {
    static registerRepositories():void {
        container.register<IClientRepository>("IClientRepository",{
            useClass:ClientRepository
        });

        container.register<IVendorRepository>("IVendorRepository",{
            useClass:VendorRepository
        })



        container.register<IAdminRepository>("IAdminRepository",{
            useClass:AdminRepository
        });


        
        container.register<ICategoryRepository>("ICategoryRepository",{
            useClass:CategoryRepository
        });

        container.register<IEventRepository>("IEventRepository",{
            useClass:EventRepository
        });

        container.register<IServiceRepository>("IServiceRepository",{
            useClass:ServiceRepository
        })

        container.register<INotificationRepository>("INotificationRepository",{
            useClass:NotificationRepository
        });

        container.register<IWalletRepository>("IWalletRepository",{
            useClass:WalletRepository
        });

        container.register<ITicketRepository>("ITicketRepository",{
            useClass:TicketRepository
        });
    }
}