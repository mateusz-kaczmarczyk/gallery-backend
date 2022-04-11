import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { UserRepository } from '../user.repository';

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailExistValidator implements ValidatorConstraintInterface {
  constructor(private readonly repository: UserRepository) { }

  async validate(email: string, args: ValidationArguments) {
    try {
      const found = await this.repository.findByEmail(email);
      return found ? false : true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

export function EmailExist(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: EmailExistValidator,
    });
  };
}