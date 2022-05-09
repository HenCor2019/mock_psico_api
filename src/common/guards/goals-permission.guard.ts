import { Roles } from '@common/enums';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '@entities';
import { GoalsService } from '@goals/services/goals.service';

@Injectable()
export class GoalsPermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly goalsService: GoalsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const user = context.switchToHttp().getRequest().user as User;
    const { goalId } = context.switchToHttp().getRequest().params;
    const goal = await this.goalsService.findById(goalId ?? -1);
    const { MODERATOR, ADMIN } = Roles;
    if (!goal) {
      return false;
    }

    const userRoles = user.roles.map((role) => role.role);
    if (this.hasRoles(userRoles, MODERATOR, ADMIN)) {
      return true;
    }

    return goal.userId.userId === user.userId;
  }

  private hasRoles(userRoles: string[], ...roles: string[]) {
    return userRoles.some((role) => roles.includes(role));
  }
}
