# Sistema de Notificaciones

## Funcionalidades Implementadas

### ✅ Crear Notificaciones (Backend)
Las notificaciones se crean automáticamente cuando:
- Se crea una nueva sesión → Notificación de CONFIRMATION
- Se cancela una sesión → Notificación de CANCELLATION  
- Se reprograma una sesión → Notificación de REMINDER

**Método usado:** `sendNotificationToUser(userId, notification)` - Envía la notificación en tiempo real vía WebSocket

### ✅ Ver Notificaciones (Frontend)
- Modal en el TopBar con icono de campana 🔔
- Badge con contador de notificaciones no leídas
- Lista de notificaciones con iconos y timestamps
- Actualización en tiempo real vía WebSocket

### ✅ Marcar como Leídas (Frontend)
- Botón ✓ en cada notificación
- Actualiza el estado a "READ" en la base de datos
- Desaparece el badge cuando todas están leídas

## Eventos WebSocket

### Cliente → Servidor
- `findAllNotifications` - Parámetro: `userId` (string)
- `removeNotification` - Parámetro: `{ id: string, userId: string }`

### Servidor → Cliente  
- `notification:userId` - Envía nueva notificación al usuario específico

## Tipos de Notificaciones

| Tipo | Icono | Cuándo |
|------|-------|--------|
| CONFIRMATION | ✅ | Nueva sesión creada |
| CANCELLATION | ❌ | Sesión cancelada |
| REMINDER | 🔔 | Sesión reprogramada |

## Cómo Probar

1. Inicia sesión como coordinador
2. Crea una nueva sesión
3. Verás notificaciones en el icono de campana
4. Haz clic para ver el modal
5. Marca como leídas con el botón ✓

## Archivos Principales

**Backend:**
- `notifications.gateway.ts` - WebSocket (usa `sendNotificationToUser`)
- `notifications.service.ts` - Lógica de negocio
- `sessions.service.ts` - Crea notificaciones al gestionar sesiones

**Frontend:**
- `connections/ws/notifications.ts` - Cliente WebSocket (singleton)
- `components/notifications/NotificationsModal.tsx` - UI y lógica del modal
- `context/NotificationsProvider.tsx` - Inicializa conexión WebSocket

## Arquitectura

```
Usuario autenticado
    ↓
NotificationsProvider conecta WebSocket
    ↓
NotificationsModal escucha notificaciones en tiempo real
    ↓
Cuando llega una notificación nueva → Se agrega automáticamente a la lista
    ↓
Usuario hace clic en ✓ → Se marca como leída
```
