import {IsString} from 'class-validator'
import { ApiModelProperty } from '@nestjs/swagger';

export class EmployeeDto {
    // @IsString()
    // // public _id?: string;
    @IsString()
    @ApiModelProperty()
    public _name: string;
    @IsString()
    @ApiModelProperty()
    public _description: string;

    @ApiModelProperty()
    public _filename: string;

    @ApiModelProperty()
    public _views: number;

    @ApiModelProperty()
    public _isPublished: boolean;
}