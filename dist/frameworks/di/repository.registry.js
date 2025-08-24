"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoryRegistry = void 0;
const tsyringe_1 = require("tsyringe");
const cllient_repository_1 = require("interfaceAdpaters/repositories/client/cllient.repository");
const vendor_repository_1 = require("interfaceAdpaters/repositories/vendor/vendor.repository");
const admin_repository_1 = require("interfaceAdpaters/repositories/admin/admin.repository");
const refresh_token_repository_1 = require("interfaceAdpaters/repositories/auth/refresh-token.repository");
const redisTokenRepository_1 = require("interfaceAdpaters/repositories/redis/redisTokenRepository");
const category_repository_1 = require("interfaceAdpaters/repositories/common/category.repository");
const event_repository_1 = require("interfaceAdpaters/repositories/event/event.repository.");
const OtpCacheRepository_1 = require("interfaceAdpaters/repositories/redis/OtpCacheRepository");
const notification_repository_1 = require("interfaceAdpaters/repositories/notification/notification.repository");
const service_repository_1 = require("interfaceAdpaters/repositories/common/service.repository");
class RepositoryRegistry {
    static registerRepositories() {
        tsyringe_1.container.register("IClientRepository", {
            useClass: cllient_repository_1.ClientRepository
        });
        tsyringe_1.container.register("IVendorRepository", {
            useClass: vendor_repository_1.VendorRepository
        });
        tsyringe_1.container.register("IRefreshTokenRepository", {
            useClass: refresh_token_repository_1.refreshTokenRepository
        });
        tsyringe_1.container.register("IOTPRepository", {
            useClass: OtpCacheRepository_1.OtpCacheRepository
        });
        tsyringe_1.container.register("IAdminRepository", {
            useClass: admin_repository_1.AdminRepository
        });
        tsyringe_1.container.register("IRedisTokenRepository", {
            useClass: redisTokenRepository_1.RedisTokenRepository
        });
        tsyringe_1.container.register("ICategoryRepository", {
            useClass: category_repository_1.CategoryRepository
        });
        tsyringe_1.container.register("IEventRepository", {
            useClass: event_repository_1.EventRepository
        });
        tsyringe_1.container.register("IServiceRepository", {
            useClass: service_repository_1.ServiceRepository
        });
        tsyringe_1.container.register("INotificationRepository", {
            useClass: notification_repository_1.NotificationRepository
        });
    }
}
exports.RepositoryRegistry = RepositoryRegistry;
