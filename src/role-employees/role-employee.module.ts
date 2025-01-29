import { Module } from '@nestjs/common';
import { RoleEmployeeController } from './role-employee.controller';
import RoleEmployeeRepository from './role-employee.repository';
import { RoleEmployeeService } from './role-employee.service';

@Module({
  controllers: [RoleEmployeeController],
  providers: [RoleEmployeeRepository, RoleEmployeeService],
})
export default class RoleEmployeeModule {}
