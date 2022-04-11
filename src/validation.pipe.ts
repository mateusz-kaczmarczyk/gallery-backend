import { HttpException, HttpStatus, ValidationError, ValidationPipe } from "@nestjs/common";

type MappedError = {
  field: string,
  errorMessage: string
}

function mapErrors(rawErrors: ValidationError[], mappedErrors: MappedError[]): void {
  for (const error of rawErrors) {
    if (error.children && error.children.length > 0) {
      mapErrors(error.children, mappedErrors);
    } else {
      mappedErrors.push({
        field: error.property,
        errorMessage: Object.values(error.constraints)[0]
      })
    }
  }
}

export function setupGlobalValidationPipe(): ValidationPipe {
  return new ValidationPipe({
    stopAtFirstError: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    exceptionFactory: (rawErrors: ValidationError[]) => {
      console.log(rawErrors);
      const mappedErrors: MappedError[] = [];
      mapErrors(rawErrors, mappedErrors);
      throw new HttpException({
        statusCode: 422,
        message: 'Validation error',
        errors: mappedErrors
      }, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  })
}