import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { UserModel } from '../pages/auth/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService {
  createDb() {
    const users: UserModel[] = [
      {
        id: 1,
        document: 'CC123',
        password: '123456',
        email: 'julio.onate@example.com',
        fullName: 'Julio Wilmer Oñate Caez',
        role: { id: 1, name: 'paciente' },
        credentials: {
          lastLogin: '2025-08-20T10:30:00Z',
          active: true,
          token: 'fake-jwt-token-123'
        }
      },
      {
        id: 2,
        document: 'CC456',
        password: 'abcdef',
        email: 'maria.lopez@example.com',
        fullName: 'María Fernanda López',
        role: { id: 1, name: 'paciente' },
        credentials: {
          lastLogin: '2025-08-18T15:45:00Z',
          active: true
        }
      },
      {
        id: 3,
        document: 'CC789',
        password: 'qwerty',
        email: 'carlos.ramirez@example.com',
        fullName: 'Carlos Ramírez',
        role: { id: 2, name: 'medico' },
        credentials: {
          lastLogin: '2025-08-10T09:00:00Z',
          active: false
        }
      },
      {
        id: 4,
        document: 'ADMIN001',
        password: 'admin123',
        email: 'admin@example.com',
        fullName: 'Administrador del Sistema',
        role: { id: 3, name: 'admin' },
        credentials: {
          lastLogin: '2025-08-23T12:00:00Z',
          active: true,
          token: 'admin-token-999'
        }
      }];

    const studies = [
      {
        id: 1,
        date: '2025-08-13',
        type: 'US - 881141 - ECOGRAFÍA DE TIROIDES / US - 881305 - ECOGRAFÍA DE ABDOMEN SUPERIOR',
        patientId: 'CC 123',
        patientName: 'ONATE CAEZ - JULIO WILMER',
        status: 'EN DIAGNOSTICO'
      },
      {
        id: 2,
        date: '2025-08-12',
        type: 'CR - 870001 - RADIOGRAFÍA DE CRÁNEO SIMPLE',
        patientId: 'CC 123',
        patientName: 'ONATE CAEZ - JULIO WILMER',
        status: 'EN ATENCION'
      },
      {
        id: 3,
        date: '2025-08-04',
        type: 'CR - 870001 - RADIOGRAFÍA DE CRÁNEO SIMPLE',
        patientId: 'CC 123',
        patientName: 'ONATE CAEZ - JULIO WILMER',
        status: 'EN ATENCION'
      },
      {
        id: 4,
        date: '2025-07-31',
        type: 'US - 881141 - ECOGRAFÍA DE TIROIDES',
        patientId: 'CC 123',
        patientName: 'ONATE CAEZ - JULIO WILMER',
        status: 'ENTREGADO'
      },
      {
        id: 5,
        date: '2025-07-31',
        type: 'US - 881112 - ECOGRAFÍA CEREBRAL TRANSFONTANELAR',
        patientId: 'CC 123',
        patientName: 'ONATE CAEZ - JULIO WILMER',
        status: 'ENTREGADO'
      },
      {
        id: 6,
        date: '2025-07-28',
        type: 'US - 881201 - ECOGRAFÍA DE MAMA',
        patientId: 'CC 123',
        patientName: 'ONATE CAEZ - JULIO WILMER',
        status: 'EN ENTREGA RESULTADO'
      },
      {
        id: 7,
        date: '2025-07-28',
        type: 'US - 881240 - ECOGRAFÍA DE TÓRAX: PERICARDIO O PLEURA',
        patientId: 'CC 123',
        patientName: 'ONATE CAEZ - JULIO WILMER',
        status: 'EN ENTREGA RESULTADO'
      },
      {
        id: 8,
        date: '2025-07-28',
        type: 'US - 881112 - ECOGRAFÍA CEREBRAL TRANSFONTANELAR',
        patientId: 'CC 123',
        patientName: 'ONATE CAEZ - JULIO WILMER',
        status: 'EN ENTREGA RESULTADO'
      },
      {
        id: 9,
        date: '2025-07-28',
        type: 'US - 881112 - ECOGRAFÍA CEREBRAL TRANSFONTANELAR',
        patientId: 'CC 123',
        patientName: 'ONATE CAEZ - JULIO WILMER',
        status: 'ENTREGADO'
      },
      {
        id: 10,
        date: '2025-07-21',
        type: 'CR - 871121 - RADIOGRAFÍA DE TÓRAX (PA, OAP, LATERAL, DECÚBITO)',
        patientId: 'CC 123',
        patientName: 'ONATE CAEZ - JULIO WILMER',
        status: 'EN ATENCION'
      },
      {
        id: 11,
        date: '2025-07-20',
        type: 'US - 881220 - GUÍA ECOGRÁFICA PARA PROCEDIMIENTOS DIAGNÓSTICOS DE MAMA - ACR',
        patientId: 'CC 123',
        patientName: 'ONATE CAEZ - JULIO WILMER',
        status: 'EN VALIDACION'
      },
      {
        id: 12,
        date: '2025-07-19',
        type: 'CR - 870002 - PERFILOGRAMA CON CEFALOMETRÍA',
        patientId: 'CC 123',
        patientName: 'ONATE CAEZ - JULIO WILMER',
        status: 'EN ATENCION'
      },
      {
        id: 13,
        date: '2025-07-16',
        type: 'CR - 870001 - RADIOGRAFÍA DE CRÁNEO SIMPLE',
        patientId: 'CC 123',
        patientName: 'ONATE CAEZ - JULIO WILMER',
        status: 'EN ATENCION'
      },
      {
        id: 14,
        date: '2025-07-16',
        type: 'CR - 870001 - RADIOGRAFÍA DE CRÁNEO SIMPLE',
        patientId: 'CC 123',
        patientName: 'ONATE CAEZ - JULIO WILMER',
        status: 'EN ATENCION'
      },
      {
        id: 15,
        date: '2025-07-05',
        type: 'CR - 870001 - RADIOGRAFÍA DE CRÁNEO SIMPLE',
        patientId: 'CC 123',
        patientName: 'ONATE CAEZ - JULIO WILMER',
        status: 'EN ATENCION'
      },
      {
        id: 16,
        date: '2025-07-05',
        type: 'CR - 501002 - RADIOGRAFÍA PARA DETECTAR EDAD ÓSEA (CARPOGRAMA)',
        patientId: 'CC 123',
        patientName: 'ONATE CAEZ - JULIO WILMER',
        status: 'EN ATENCION'
      },
      {
        id: 17,
        date: '2025-07-02',
        type: 'CR - 870001 - RADIOGRAFÍA DE CRÁNEO SIMPLE',
        patientId: 'CC 123',
        patientName: 'ONATE CAEZ - JULIO WILMER',
        status: 'EN ATENCION'
      },
      {
        id: 18,
        date: '2025-07-02',
        type: 'CR - 870001 - RADIOGRAFÍA DE CRÁNEO SIMPLE',
        patientId: 'CC 123',
        patientName: 'ONATE CAEZ - JULIO WILMER',
        status: 'EN ATENCION'
      },
      {
        id: 19,
        date: '2025-07-02',
        type: 'CR - 870001 - RADIOGRAFÍA DE CRÁNEO SIMPLE',
        patientId: 'CC 123',
        patientName: 'ONATE CAEZ - JULIO WILMER',
        status: 'EN ATENCION'
      },
      {
        id: 20,
        date: '2025-07-01',
        type: 'CR - 501002 - RADIOGRAFÍA PARA DETECTAR EDAD ÓSEA (CARPOGRAMA)',
        patientId: 'CC 123',
        patientName: 'ONATE CAEZ - JULIO WILMER',
        status: 'EN ATENCION'
      }
    ];

    return { users, studies };
  }
}
