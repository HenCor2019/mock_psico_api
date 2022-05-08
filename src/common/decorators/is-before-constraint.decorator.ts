// BASED ON: https://stackoverflow.com/questions/60451337/password-confirmation-in-typescript-with-class-validator
//
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function IsBefore(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: {
        validate(value: string, args: ValidationArguments) {
          const [constraint] = args.constraints;
          const relatedValue = (args.object as any)[constraint];
          return value < relatedValue;
        },
        defaultMessage(args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          return `"${propertyName}" must be before than ${relatedPropertyName}`;
        },
      },
    });
  };
}
