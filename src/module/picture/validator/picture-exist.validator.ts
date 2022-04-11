import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { PictureRepository } from '../picture.repository';

@Injectable()
@ValidatorConstraint({ async: true })
export class PictureExistConstraint implements ValidatorConstraintInterface {

  constructor(
    private readonly repository: PictureRepository,
  ) { }

  async validate(id: number, args: ValidationArguments) {
    try {
      const found = await this.repository.findOne(id);
      return found ? true : false;
    } catch (error) {
      throw error;
    }
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `Picture with id ${validationArguments.value} does not exist`;
  }
}

export function PictureExist(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: PictureExistConstraint,
    });
  };
}
