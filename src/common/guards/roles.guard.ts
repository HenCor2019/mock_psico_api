import { Roles } from '@common/enums';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '@entities';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const { ROLES_KEY } = process.env;
    console.log({ ROLES_KEY });
    const requiredRoles = this.reflector.getAllAndOverride<Roles[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    console.log('------ verifyng roles ----------');

    if (!requiredRoles) {
      return true;
    }

    const user = context.switchToHttp().getRequest().user as User;
    const userRoles = user.roles.map((role) => role.role);
    return requiredRoles.some((role) => userRoles.includes(role));
  }
}
