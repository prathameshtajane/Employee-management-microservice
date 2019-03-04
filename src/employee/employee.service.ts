import {Injectable, Inject, HttpStatus, HttpException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './employee.entity';
import {stringify} from "querystring";
import {EmployeeDto} from "./employee.dto";

@Injectable()
export class EmployeeService {
    constructor(
        @InjectRepository(Employee)
        private readonly employeeRepository: Repository<Employee>,
    ) {}

    async findAll(): Promise<EmployeeDto[]> {
        let employees:EmployeeDto[]=await this.employeeRepository.find();
        if(employees.length == 0){
            throw new HttpException('No employees found', HttpStatus.NOT_FOUND);
        }
        return employees;
    }

    async findAllByPageNumber(page:number): Promise<EmployeeDto[]> {
        let employees:EmployeeDto[]=await this.employeeRepository.find({
                take:1,
                skip:1*(page-1)});
        if(employees.length == 0){
            throw new HttpException('No employees found', HttpStatus.NOT_FOUND);
        }
        return employees;
    }

    async create(employee:EmployeeDto){
        // console.log("Employee Service");
        // console.log(employee);
        // const employee_data = await this.employeeRepository.create(employee);
        // await this.employeeRepository.save(employee_data);
        return await this.employeeRepository.save(employee);
    }

    async findEmployeeById(emp_id:number){
        let employee:Employee = await this.employeeRepository.findOne(emp_id);
        if(employee == undefined){
            throw new HttpException('Employee with id '+emp_id+' not found !',HttpStatus.NOT_FOUND);
        }
        return employee;
    }

    async updateEmployeeById(emp_id:number, employee:Partial<EmployeeDto>){
        let currEmployee:EmployeeDto = await this.employeeRepository.findOne(emp_id);
        if(this.isEmpFirstNameLastNameModified(currEmployee,employee)){
            throw new HttpException('Employee with id '+emp_id+' name modification not allowed !',
                HttpStatus.UNAUTHORIZED);
        }
        if(currEmployee == undefined){
            throw new HttpException('Employee with id '+emp_id+' not found !',HttpStatus.NOT_FOUND);
        }
        return await this.employeeRepository.save(employee);

    }

    isEmpFirstNameLastNameModified(currEmp:EmployeeDto,toBeUpdtEmp:Partial<EmployeeDto>):boolean{
        if(!toBeUpdtEmp._name ||toBeUpdtEmp._name !== currEmp._name){
            return true;
        }
        return false;
    }

    async deleteEmployeeById(emp_id:number):Promise<any>{
        let currEmployee:Employee = await this.employeeRepository.findOne({where:{emp_id}});
        if(currEmployee == undefined){
            throw new HttpException('Employee with id '+emp_id+' not found !',HttpStatus.NOT_FOUND);
        }
        await this.employeeRepository.remove(currEmployee);
    }

    async deleteSoftEmployeeById(emp_id:number):Promise<any>{
        let currEmployee:Employee = await this.employeeRepository.findOne(emp_id);
        if(currEmployee == undefined){
            throw new HttpException('Employee with id '+emp_id+' not found !',HttpStatus.NOT_FOUND);
        }
        currEmployee.isPublished=true;
        currEmployee.id="";
        return await this.employeeRepository.save(currEmployee);
    }


}