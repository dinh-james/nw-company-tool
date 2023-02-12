import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { Permission } from '@nw-company-tool/model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export type NavigationItem = {
  label: string;
  routerLink: string;
  icon: string;
  disabled: boolean;
};

@Injectable({ providedIn: 'root' })
export class NavigationService {
  private basicNavigation: NavigationItem[] = [
    {
      label: 'MY CHARACTER',
      routerLink: 'my-character',
      icon: 'icon_character.png',
      disabled: false
    },
    {
      label: 'COMPANY',
      routerLink: 'company',
      icon: 'icon_company.png',
      disabled: false
    },
    {
      label: 'EXPEDITION',
      routerLink: 'expedition',
      icon: 'icon_expedition.png',
      disabled: false
    },
    {
      label: 'WAR',
      routerLink: 'war',
      icon: 'icon_war.png',
      disabled: true
    },
    {
      label: 'INVASION',
      routerLink: 'invasion',
      icon: 'icon_invasion.png',
      disabled: true
    },
    {
      label: 'OUTPOST RUSH',
      routerLink: 'opr',
      icon: 'icon_outpostrush.png',
      disabled: true
    }
  ];

  private adminNavigation: NavigationItem[] = [
    {
      label: 'ADMIN',
      routerLink: 'admin',
      icon: 'icon_ranks.png',
      disabled: false
    }
  ];

  private pluginNavigation: NavigationItem[] = [];

  constructor(private userService: UserService /* private pluginService: PluginService*/) {
    // pluginService.getPlugins().subscribe(
    //   (plugins) =>
    //     (this.pluginNavigation = plugins.map((plugin) => ({
    //       label: plugin.navigationLabel,
    //       routerLink: plugin.navigationName + '/flights-search', // TODO temp
    //       icon: plugin.navigationIcon
    //     })))
    // );
  }

  isAdmin(): Observable<boolean> {
    return this.userService.getUser$().pipe(map((user) => !!user?.permissions?.includes(Permission.ADMIN)));
  }

  getNavigationItems(): Observable<NavigationItem[]> {
    const navigation = this.basicNavigation.concat(this.pluginNavigation);
    return this.isAdmin().pipe(
      map((admin) => {
        if (!admin) {
          return navigation;
        } else {
          return navigation.concat(this.adminNavigation);
        }
      })
    );
  }
}
