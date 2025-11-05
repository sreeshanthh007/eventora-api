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
import { IWorkSampleRepository } from "@entities/repositoryInterfaces/vendor/worksample/work-sample.repository.interface";
import { WorkSampleRepository } from "interfaceAdpaters/repositories/worksample/work-sample.repository";
import { IBookingRepository } from "@entities/repositoryInterfaces/booking/booking.repository.interface";
import { BookingRepository } from "interfaceAdpaters/repositories/booking/booking.repository";
import { IRatingRepository } from "@entities/repositoryInterfaces/rating/rating.repository.interface";
import { RatingRepository } from "interfaceAdpaters/repositories/rating/rating.repository";
import { IChatRoomRepository } from "@entities/repositoryInterfaces/chat/chat.repository.interface";
import { ChatRoomRepository } from "interfaceAdpaters/repositories/chat/chatRoom.repository";
import { IMessageRepository } from "@entities/repositoryInterfaces/chat/message.repository.interface";
import { MessageRepository } from "interfaceAdpaters/repositories/chat/message.repository";

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

        container.register<IBookingRepository>("IBookingRepository",{
            useClass:BookingRepository
        });


        container.register<IWorkSampleRepository>("IWorkSampleRepository",{
            useClass:WorkSampleRepository
        });

        container.register<IRatingRepository>("IRatingRepository",{
            useClass:RatingRepository
        });


        container.register<IChatRoomRepository>("IChatRoomRepository",{
            useClass:ChatRoomRepository
        });

        container.register<IMessageRepository>("IMessageRepository",{
            useClass:MessageRepository
        });
    }
}