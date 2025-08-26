import { Component, OnInit, OnDestroy, inject, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../auth/services/auth.service';
import { UserModel } from '../../../auth/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit, OnDestroy {
  private authService = inject(AuthService);
  private subscription: Subscription | null = null;

  // State management with signals
  currentUser = signal<UserModel | null>(null);
  isLoading = signal(false);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.loadUserProfile();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private loadUserProfile(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.subscription = this.authService.currentUser$.subscribe({
      next: (user) => {
        this.currentUser.set(user || null);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error loading user profile:', err);
        this.error.set('Error al cargar el perfil del usuario.');
        this.isLoading.set(false);
      }
    });
  }

  /** Get formatted role display name */
  getRoleDisplayName(roleName?: string): string {
    if (!roleName) return 'Usuario';
    
    const roleMap: Record<string, string> = {
      'paciente': 'Paciente',
      'medico': 'Médico',
      'admin': 'Administrador'
    };
    
    return roleMap[roleName.toLowerCase()] || roleName;
  }

  /** Get role badge CSS class */
  getRoleBadgeClass(roleName?: string): string {
    if (!roleName) return 'bg-secondary';
    
    const roleClassMap: Record<string, string> = {
      'paciente': 'bg-primary',
      'medico': 'bg-success', 
      'admin': 'bg-warning'
    };
    
    return roleClassMap[roleName.toLowerCase()] || 'bg-secondary';
  }

  /** Format last login date */
  formatLastLogin(lastLogin?: string): string {
    if (!lastLogin) return 'Nunca';
    
    try {
      const date = new Date(lastLogin);
      return date.toLocaleDateString('es-CO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'Fecha inválida';
    }
  }

  /** Handle edit profile action */
  onEditProfile(): void {
    // TODO: Implementar edición de perfil
    console.log('Edit profile clicked');
  }

  /** Handle change password action */
  onChangePassword(): void {
    // TODO: Implementar cambio de contraseña
    console.log('Change password clicked');
  }

  /** Retry loading profile data */
  retry(): void {
    this.loadUserProfile();
  }
}
