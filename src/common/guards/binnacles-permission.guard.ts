import { Roles } from '@common/enums';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '@entities';
import { BinnaclesService } from '@binnacles/services/binnacles.service';

@Injectable()
export class BinnaclesPermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly binnaclesService: BinnaclesService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const user = context.switchToHttp().getRequest().user as User;
    const { binnacleId } = context.switchToHttp().getRequest().params;
    const binnacle = await this.binnaclesService.findById(binnacleId ?? -1);
    const { MODERATOR, ADMIN } = Roles;
    if (!binnacle) {
      return false;
    }

    const userRoles = user.roles.map((role) => role.role);
    if (this.hasRoles(userRoles, MODERATOR, ADMIN)) {
      return true;
    }

    return binnacle.userId.userId === user.userId;
  }

  private hasRoles(userRoles: string[], ...roles: string[]) {
    return userRoles.some((role) => roles.includes(role));
  }
}
