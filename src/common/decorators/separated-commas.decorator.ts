// BASED ON: https://stackoverflow.com/questions/60451337/password-confirmation-in-typescript-with-class-validator
import { registerDecorator, ValidationArguments } from 'class-validator';

export function IsSeparatedByCommas() {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      validator: {
        validate(value: string, args: ValidationArguments) {
          if (!value) return true;
          return (
            value.match(
              /^((\-)?(([a-zA-Z_])+){1})$|^((((\-)?[a-zA-Z_])+,)+((\-)?[a-zA-Z_])+)$/,
            ) !== null
          );
        },
        defaultMessage(args: ValidationArguments) {
          return 'Invalid syntax for separated values, should be see like a,b,c';
        },
      },
    });
  };
}
