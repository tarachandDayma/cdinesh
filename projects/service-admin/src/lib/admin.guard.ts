import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EnvironmentService, loaderserice } from 'service-common';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private loaderService: loaderserice, private environment: EnvironmentService) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let module = next.data.ModuleName as string;
    let action = next.data.Action as string;
    this.loaderService.show(true);
    if (this.environment.CheckModuleAccess(module,action)) {
      this.loaderService.show(false);
      return true;
    } else {
      this.loaderService.show(false);
      this.environment.returnUrl = state.url;
      this.router.navigateByUrl("accessdenied");
      return false;
    }
  }
  
}
