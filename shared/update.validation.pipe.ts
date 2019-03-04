import {
    ArgumentMetadata,
    BadRequestException,
    HttpException,
    HttpStatus,
    Injectable,
    PipeTransform
} from "@nestjs/common";
import {plainToClass} from "class-transformer";
import {validate} from "class-validator";
import {Employee} from "../src/employee/employee.entity";
import {Repository} from "typeorm";
import {EmployeeDto} from "../src/employee/employee.dto";
import {EmployeeService} from "../src/employee/employee.service";
import {async} from "rxjs/internal/scheduler/async";

@Injectable()
export class UpdateValidationPipe implements PipeTransform<any> {

    // constructor(
    //     private readonly employeeService: EmployeeService,
    // ) {}

    async transform(value: any, {metatype}: ArgumentMetadata) {

        if(value instanceof Object && this.isEmpty(value)){
            throw new HttpException('Validation Failed : No body submitted',
                HttpStatus.BAD_REQUEST);
        }

        // const {metadata} = metadata;
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        const object = plainToClass(metatype, value);
        const errors = await validate(object);

        if (errors.length > 0) {
            throw new HttpException(`Validation Failed: ${this.formatErrors(errors)}`,
                HttpStatus.UNAUTHORIZED);
        }

        // if(this.isFirstLastNameModified(value)){
        //     throw new HttpException(`Validation Failed: Can not modify employee First Name or Last Name`,
        //         HttpStatus.UNAUTHORIZED);
        // }
        return value;
    }

    private toValidate(metatype): boolean {
        const types = [String, Boolean, Number, Array, Object];
        return !types.find((type) => metatype === type);
    }

    private formatErrors(errors: any[]) {
        return errors.map(err => {
            for (let property in err.constraints) {
                return err.constraints[property];
            }
        }).join(',');
    }


    private isEmpty(value: any) {
        if (Object.keys(value).length > 0) {
            return false;
        }
        return true;
    }

    // private isFirstLastNameModified(value:any){
    //     let emp:Promise<Employee>= this.employeeService.findEmployeeById(value._id);
    //     // if(emp._name !== value._name){
    //     //     return true;
    //     // }
    //     console.log("Pipes : isFirstLastNameModified");
    //     console.log(emp);
    //     return false;
    // }
}