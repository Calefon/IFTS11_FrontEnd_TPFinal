import { Injectable } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly storageKey = 'lang';

  constructor(private translocoService: TranslocoService) {
    const savedLang = localStorage.getItem(this.storageKey) || 'es';
    this.setLanguage(savedLang);
  }

  get currentLang(): string {
    return this.translocoService.getActiveLang();
  }

  onToggleLanguage(): void {
    const newLang = this.currentLang === 'es' ? 'en' : 'es';
    this.setLanguage(newLang);
  }

  private setLanguage(lang: string): void {
    this.translocoService.setActiveLang(lang);
    localStorage.setItem(this.storageKey, lang);
  }
}
