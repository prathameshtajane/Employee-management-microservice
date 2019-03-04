import {Body, Controller, Delete, Get, Logger, Param, Post, Put, Query, UsePipes} from "@nestjs/common";
import {EmployeeService} from "./employee.service";
import {Employee} from "./employee.entity";
import {EmployeeDto} from "./employee.dto";
import {UpdateValidationPipe} from "../../shared/update.validation.pipe";
import { ApiUseTags,ApiResponse } from '@nestjs/swagger';

@Controller('employee')
@ApiUseTags('employee')
export class EmployeeController {
    constructor(private readonly employeeService:EmployeeService) {}
    private logger = new Logger('EmployeeController');

    @Get()
    getAllEmployeeByPage(@Query('page') page:number): any {
        // console.log(params);
        return this.employeeService.findAllByPageNumber(page);
    }

    // localhost:3001/employee/findall
    @Get('all')
    getAllEmployee(): any {
        return this.employeeService.findAll();
    }

    // localhost:3001/employee/id
    @Get(':id')
    findEmployeeById(@Param('id') emp_id) {
        return this.employeeService.findEmployeeById(emp_id);
    }

    // localhost:3001/employee/
    @Post()
    @ApiResponse({ status: 201, description: 'The employee record has been successfully created.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    createEmployee(@Body() employee:EmployeeDto){

        this.logger.log(JSON.stringify(employee));
        return this.employeeService.create(employee);
    }

    @Put(':emp_id')
    @UsePipes(new UpdateValidationPipe())
    updateEmployee(@Param('emp_id') emp_id, @Body() employee:EmployeeDto){
        this.logger.log(JSON.stringify(employee));
        return this.employeeService.updateEmployeeById(emp_id,employee);
    }

    @Delete('soft/:emp_id')
    deleteSoftEmployee(@Param('emp_id') emp_id){
        return this.employeeService.deleteSoftEmployeeById(emp_id);
    }

    @Delete('hard/:emp_id')
    deleteHardEmployee(@Param('emp_id') emp_id){
        return this.employeeService.deleteEmployeeById(emp_id);
    }


}