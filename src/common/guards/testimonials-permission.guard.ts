import { Roles } from '@common/enums';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '@entities';
import { TestimonialsService } from '@testimonials/services/testimonials.service';

@Injectable()
export class TestimonialsPermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly testimonialsService: TestimonialsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const user = context.switchToHttp().getRequest().user as User;
    const { testimonialId } = context.switchToHttp().getRequest().params;
    const testimonial = await this.testimonialsService.findById(
      testimonialId ?? -1,
    );
    const { MODERATOR, ADMIN } = Roles;
    if (!testimonial) {
      return false;
    }

    const userRoles = user.roles.map((role) => role.role);
    if (this.hasRoles(userRoles, MODERATOR, ADMIN)) {
      return true;
    }

    return testimonial.userId.userId === user.userId;
  }

  private hasRoles(userRoles: string[], ...roles: string[]) {
    return userRoles.some((role) => roles.includes(role));
  }
}
