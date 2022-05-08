// BASED ON: https://stackoverflow.com/questions/60451337/password-confirmation-in-typescript-with-class-validator
import { registerDecorator, ValidationArguments } from 'class-validator';

export function IncludeSorters(...args: string[]) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      constraints: [...args],
      validator: {
        validate(value: string, args: ValidationArguments) {
          const sorters = value.split(',');
          const availableSorters = args.constraints;
          return (
            sorters
              .map((sort) => (sort.match(/^[+-]/) ? sort.substring(1) : sort))
              .filter((sort) => availableSorters.includes(sort)).length ===
            sorters.length
          );
        },
        defaultMessage(args: ValidationArguments) {
          const sorters = args.constraints;
          return `${propertyName} must match only with ${sorters.join(
            ', ',
          )} with no repetitions`;
        },
      },
    });
  };
}
