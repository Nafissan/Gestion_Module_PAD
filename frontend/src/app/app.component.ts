import { DOCUMENT } from "@angular/common";
import { Component, Inject, Renderer2 } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { SidenavService } from "./layout/sidenav/sidenav.service";
import { ThemeService } from "../@fury/services/theme.service";
import { ActivatedRoute } from "@angular/router";
import { filter } from "rxjs/operators";
import { Platform } from "@angular/cdk/platform";
import { SplashScreenService } from "../@fury/services/splash-screen.service";
import { AuthenticationService } from "./shared/services/authentification.service";
import { getMenu } from "./shared/util/url";

@Component({
  selector: "fury-root",
  templateUrl: "./app.component.html",
})
export class AppComponent {
  
  constructor(
    private sidenavService: SidenavService,
    private iconRegistry: MatIconRegistry,
    private renderer: Renderer2,
    private themeService: ThemeService,
    @Inject(DOCUMENT) private document: Document,
    private platform: Platform,
    private route: ActivatedRoute,
    private splashScreenService: SplashScreenService,

    
    private authentificationService: AuthenticationService,
  ) {
    this.route.queryParamMap
      .pipe(filter((queryParamMap) => queryParamMap.has("style")))
      .subscribe((queryParamMap) =>
        this.themeService.setStyle(queryParamMap.get("style"))
      );

    this.iconRegistry.setDefaultFontSetClass("material-icons-outlined");
    this.themeService.theme$.subscribe((theme) => {
      if (theme[0]) {
        this.renderer.removeClass(this.document.body, theme[0]);
      }

      this.renderer.addClass(this.document.body, theme[1]);
    });

    
    if (this.platform.BLINK) {
      this.renderer.addClass(this.document.body, "is-blink");
    }
    if (this.authentificationService.isAuthenticated()) {
       this.sidenavService.items = [];
       let menu = getMenu(this.authentificationService.roles);
       this.sidenavService.addItems(menu);

      }
  }
}
