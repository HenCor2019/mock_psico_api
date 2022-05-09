import { Roles } from '@common/enums';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '@entities';
import { TipsService } from '@tips/services/tips.service';

@Injectable()
export class TipsPermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly tipsServices: TipsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const user = context.switchToHttp().getRequest().user as User;
    const { tipId } = context.switchToHttp().getRequest().params;
    const tip = await this.tipsServices.findById(tipId ?? -1);
    const { MODERATOR, ADMIN } = Roles;
    if (!tip) {
      return false;
    }

    const userRoles = user.roles.map((role) => role.role);
    if (this.hasRoles(userRoles, MODERATOR, ADMIN)) {
      return true;
    }

    return tip.userId.userId === user.userId;
  }

  private hasRoles(userRoles: string[], ...roles: string[]) {
    return userRoles.some((role) => roles.includes(role));
  }
}
