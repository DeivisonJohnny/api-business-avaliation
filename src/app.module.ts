import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import { EmployeeModule } from './employee/employee.module';
import RoleEmployeeModule from './role-employees/role-employee.module';
import { AvaliationModule } from './avaliation/avaliation.module';
import SectorModule from './sector/sector.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    EmployeeModule,
    RoleEmployeeModule,
    AvaliationModule,
    SectorModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
