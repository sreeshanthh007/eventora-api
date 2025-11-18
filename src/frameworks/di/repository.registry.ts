import { container } from "tsyringe";

import { IClientRepository } from "@entities/repositoryInterfaces/client/client-repository.interface";
import { ClientRepository } from "@repos/client/cllient.repository";
import { IVendorRepository } from "@entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { VendorRepository } from "@repos/vendor/vendor.repository";
import { IAdminRepository } from "@entities/repositoryInterfaces/admin/admin-repository-interface";
import { AdminRepository } from "@repos/admin/admin.repository";
import { ICategoryRepository } from "@entities/repositoryInterfaces/admin/category.interface";
import { CategoryRepository } from "@repos/common/category.repository";
import { IEventRepository } from "@entities/repositoryInterfaces/vendor/event/event.repository.interface";
import { EventRepository } from "@repos/event/event.repository.";
import { INotificationRepository } from "@entities/repositoryInterfaces/notification/notification.repository.interface";
import { NotificationRepository } from "@repos/notification/notification.repository";
import { IServiceRepository } from "@entities/repositoryInterfaces/vendor/service/service.repository.interface";
import { ServiceRepository } from "@repos/common/service.repository";
import { IWalletRepository } from "@entities/repositoryInterfaces/wallet/wallet.repository.interface";
import { WalletRepository } from "@repos/wallet/wallet.repository";
import { ITicketRepository } from "@entities/repositoryInterfaces/ticket/ticket-repository-interface";
import { TicketRepository } from "@repos/ticket/ticket-repository";
import { IWorkSampleRepository } from "@entities/repositoryInterfaces/vendor/worksample/work-sample.repository.interface";
import { WorkSampleRepository } from "@repos/worksample/work-sample.repository";
import { IBookingRepository } from "@entities/repositoryInterfaces/booking/booking.repository.interface";
import { BookingRepository } from "@repos/booking/booking.repository";
import { IRatingRepository } from "@entities/repositoryInterfaces/rating/rating.repository.interface";
import { RatingRepository } from "@repos/rating/rating.repository";
import { IChatRoomRepository } from "@entities/repositoryInterfaces/chat/chat.repository.interface";
import { ChatRoomRepository } from "@repos/chat/chatRoom.repository";
import { IMessageRepository } from "@entities/repositoryInterfaces/chat/message.repository.interface";
import { MessageRepository } from "@repos/chat/message.repository";

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