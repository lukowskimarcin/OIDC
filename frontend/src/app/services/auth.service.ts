import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private oAuthService = inject(OAuthService);
  private router = inject(Router);

  constructor() {
    this.initConfiguration();
  }

  initConfiguration() {
    const authConfig: AuthConfig = {
      issuer: 'http://localhost:8081/realms/angular',
      tokenEndpoint:
        'http://localhost:8081/realms/angular/protocol/openid-connect/token',
      userinfoEndpoint:
        'http://localhost:8081/realms/angular/protocol/openid-connect/userinfo',
      clientId: 'angular_test',
      redirectUri: window.location.origin + '/dashboard',
      scope: 'openid profile email roles address',
      responseType: 'code',
      requireHttps: false,
      showDebugInformation: true,
    };

    this.oAuthService.configure(authConfig);
    this.oAuthService.setupAutomaticSilentRefresh();
    this.oAuthService.loadDiscoveryDocumentAndTryLogin();

    localStorage.setItem('token', this.oAuthService.getAccessToken());
  }

  login() {
    this.oAuthService.initLoginFlow();
    // this.oAuthService.initImplicitFlow();
  }

  logout() {
    this.oAuthService.revokeTokenAndLogout();
    this.oAuthService.logOut();
  }

  getProfile() {
    const profile = this.oAuthService.getIdentityClaims();
    return profile;
  }

  getToken() {
    return this.oAuthService.getAccessToken();
  }
}
