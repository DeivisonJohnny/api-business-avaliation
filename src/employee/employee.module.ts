import { Module } from '@nestjs/common';
import EmployeeController from './employee.controller';
import EmployeeService from './employee.service';
import EmployeeRepository from './employee.repository';
import { RoleEmployeeService } from 'src/role-employees/role-employee.service';
import RoleEmployeeRepository from 'src/role-employees/role-employee.repository';

@Module({
  controllers: [EmployeeController],
  providers: [
    EmployeeService,
    EmployeeRepository,
    RoleEmployeeService,
    RoleEmployeeRepository,
  ],
})
export class EmployeeModule {}
