import { formatDate } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges, computed, inject, signal } from '@angular/core';
import { StudyModel } from '../../models/study.model';
import { StudiesService } from '../../services/studies.service';

@Component({
  selector: 'app-list-studies',
  templateUrl: './list-studies.component.html',
  styleUrl: './list-studies.component.scss'
})
export class ListStudiesComponent implements OnInit, OnChanges {
  @Input() patientDocument?: string;

  private studiesService = inject(StudiesService);

  // Signal-based state management
  private allStudies = signal<StudyModel[]>([]);
  isLoading = signal(false);
  error = signal<string | null>(null);

  searchQuery = signal('');
  statusFilter = signal('all');
  sortDirection = signal<'asc' | 'desc'>('desc');
  currentPage = signal(1);
  pageSize = signal(8);

  // Computed properties
  availableStatuses = computed(() => {
    const statuses = new Set(this.allStudies().map(study => study.status));
    return Array.from(statuses).sort();
  });

  filteredStudies = computed(() => {
    const target = this.normalizeDoc(this.patientDocument);
    const query = this.searchQuery().toLowerCase();
    const filter = this.statusFilter();

    return this.allStudies()
      .filter(study => this.normalizeDoc(study.patientId).includes(target))
      .filter(study => {
        if (!query) return true;
        return (
          (study.type || '').toLowerCase().includes(query) ||
          (study.patientName || '').toLowerCase().includes(query) ||
          (study.patientId || '').toLowerCase().includes(query) ||
          (study.status || '').toLowerCase().includes(query)
        );
      })
      .filter(study => filter === 'all' ? true : study.status === filter)
      .sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return this.sortDirection() === 'asc'
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime();
      });
  });

  totalPages = computed(() => {
    return Math.ceil(this.filteredStudies().length / this.pageSize());
  });

  paginatedStudies = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.filteredStudies().slice(start, start + this.pageSize());
  });

  visiblePages = computed(() => {
    const total = this.totalPages();
    return Array.from({ length: total }, (_, i) => i + 1);
  });

  ngOnInit(): void {
    this.loadStudies();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['patientDocument'] && !changes['patientDocument'].isFirstChange()) {
      this.currentPage.set(1);
    }
  }

  private normalizeDoc(doc?: string) {
    return (doc || '').replace(/\s+/g, '').toUpperCase();
  }

  loadStudies(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.studiesService.getAll().subscribe({
      next: (studies) => {
        this.allStudies.set(studies || []);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error loading studies:', err);
        this.allStudies.set([]);
        this.error.set('Error al cargar los estudios. Por favor, intenta nuevamente.');
        this.isLoading.set(false);
      }
    });
  }

  onSearchChange(): void {
    this.currentPage.set(1);
  }

  toggleSort(): void {
    const newDirection = this.sortDirection() === 'asc' ? 'desc' : 'asc';
    this.sortDirection.set(newDirection);
  }

  changeStatusFilter(status: string): void {
    this.currentPage.set(1);
    this.statusFilter.set(status);
  }

  goToPage(pageNumber: number): void {
    if (pageNumber < 1) pageNumber = 1;
    if (pageNumber > this.totalPages()) pageNumber = this.totalPages();
    this.currentPage.set(pageNumber);
  }

  formatLocal(dateStr: string): string {
    try {
      return formatDate(dateStr, 'dd/MM/yyyy', 'es-CO');
    } catch {
      return dateStr;
    }
  }

  /** Get status display name */
  getStatusDisplayName(status: string): string {
    const statusMap: Record<string, string> = {
      'ENTREGADO': 'Entregado',
      'EN ENTREGA RESULTADO': 'En Entrega de Resultado',
      'EN VALIDACION': 'En Validación',
      'EN DIAGNOSTICO': 'En Diagnóstico',
      'EN ATENCION': 'En Atención'
    };
    return statusMap[status] || status;
  }

  /** Get status icon class */
  getStatusIcon(status: string): string {
    switch (status) {
      case 'ENTREGADO':
        return 'bi bi-check-circle-fill';
      case 'EN ENTREGA RESULTADO':
        return 'bi bi-arrow-right-circle-fill';
      case 'EN VALIDACION':
        return 'bi bi-hourglass-split';
      case 'EN DIAGNOSTICO':
        return 'bi bi-search';
      case 'EN ATENCION':
        return 'bi bi-clock-fill';
      default:
        return 'bi bi-circle-fill';
    }
  }

  /** Get status badge CSS class for improved semantics */
  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'ENTREGADO':
        return 'bg-success';
      case 'EN ENTREGA RESULTADO':
      case 'EN VALIDACION':
        return 'bg-warning';
      case 'EN DIAGNOSTICO':
      case 'EN ATENCION':
        return 'bg-info';
      default:
        return 'bg-secondary';
    }
  }

  /** Clear all filters and reset pagination */
  clearFilters(): void {
    this.searchQuery.set('');
    this.statusFilter.set('all');
    this.currentPage.set(1);
  }

  /** Refresh data from service */
  refresh(): void {
    this.loadStudies();
  }
}
