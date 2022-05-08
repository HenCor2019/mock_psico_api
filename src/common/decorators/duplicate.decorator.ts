// BASED ON: https://stackoverflow.com/questions/60451337/password-confirmation-in-typescript-with-class-validator
import { registerDecorator, ValidationArguments } from 'class-validator';

export function NotDuplicates(...args: string[]) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      constraints: [...args],
      validator: {
        validate(value: number[], args: ValidationArguments) {
          if (!value) return false;
          if (!value?.length) return true;
          return (
            value?.filter((value, index, self) => self.indexOf(value) === index)
              .length === value?.length
          );
        },
        defaultMessage(args: ValidationArguments) {
          return `${propertyName} not should contains with duplicates`;
        },
      },
    });
  };
}
