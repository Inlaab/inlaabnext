# Metryca 360° — Documentación del Proyecto

## Qué es

Sistema de acceso privado a recorridos virtuales 360° de INLAAB. Los clientes ingresan un código de acceso en `metryca.inlaab.com` y visualizan los tours en pantalla completa.

---

## Arquitectura

```
Usuario
  ↓
metryca.inlaab.com        → Vercel (Next.js) — repo: inlaabnext
  ↓ [iframe]
media.inlaab.com          → Cloudflare R2 — bucket: inlaab-360
  └── /360/oficina/       → Tour Oficina (3DVista)
  └── /360/sheraton/      → Tour Sheraton (3DVista)
```

**Flujo de autenticación:**
```
/ (login) → POST /api/verify → cookie JWT → /metryca/tours → /metryca/tours/[slug]
```

---

## Stack

| Componente | Tecnología |
|------------|-----------|
| Frontend / Auth | Next.js 14 (App Router) en Vercel |
| Tours (archivos estáticos) | Cloudflare R2 + CDN |
| DNS | Cloudflare |
| Repo | GitHub → inlaabnext |

---

## Estructura de archivos en el repo

```
src/
├── middleware.ts                        ← protege /metryca/tours/* con JWT
├── lib/
│   └── token.ts                        ← firma y verifica tokens HMAC-SHA256
└── app/
    ├── api/
    │   ├── verify/route.ts             ← POST: verifica código, setea cookie
    │   └── logout/route.ts             ← POST: elimina cookie, redirige
    ├── metryca/
    │   ├── page.tsx                    ← login con border beam animado
    │   └── tours/
    │       ├── page.tsx                ← selector de tours (Server Component)
    │       ├── TourCard.tsx            ← card con hover (Client Component)
    │       ├── TourViewer.tsx          ← iframe fullscreen + header flotante
    │       ├── oficina/page.tsx        ← carga TourViewer con URL de oficina
    │       └── sheraton/page.tsx       ← carga TourViewer con URL de sheraton
    └── client-layout.tsx               ← detecta /metryca y omite chat/footer
```

---

## Variables de entorno

Configuradas en `.env.local` (local) y en Vercel dashboard (producción):

```env
ACCESS_CODE=M3TRYC4
JWT_SECRET=inlaab-metryca-360-secret-k9x2p7q4m8n3r6t1
TOUR_OFICINA_URL=https://media.inlaab.com/360/oficina/index.html
TOUR_SHERATON_URL=https://media.inlaab.com/360/sheraton/index.htm
```

> El `JWT_SECRET` en producción debe ser diferente al de desarrollo. Generarlo con al menos 32 caracteres aleatorios.

---

## Seguridad

- **Código de acceso:** verificado server-side en `/api/verify`. Nunca expuesto al cliente.
- **Sesión:** cookie `metryca_session` HTTP-only, firmada con HMAC-SHA256, expira en 24h.
- **Protección de rutas:** middleware de Next.js intercepta `/metryca/tours/*` antes de servir cualquier contenido.
- **Tours en R2:** accesibles públicamente por URL, pero el usuario necesita pasar por el auth para llegar al iframe.
- **CSP en R2:** configurado para permitir embedding solo desde `metryca.inlaab.com` (si se requiere, agregar via Cloudflare Transform Rules).

---

## DNS Cloudflare (inlaab.com)

| Tipo | Nombre | Destino | Proxy |
|------|--------|---------|-------|
| CNAME | `metryca` | `491dbd469d94a7d8.vercel-dns-017.com` | DNS only |
| CNAME | `media` | `inlaab-360.r2.cloudflarestorage.com` | Proxied (automático por R2) |

---

## Cloudflare R2

- **Bucket:** `inlaab-360`
- **Región:** `enam` (Eastern North America — óptimo para Colombia)
- **Dominio personalizado:** `media.inlaab.com`
- **Estructura:**
  ```
  inlaab-360/
  └── 360/
      ├── oficina/     → 8,162 archivos / 633 MB
      └── sheraton/    → 872 archivos / 182 MB
  ```

### Subir/actualizar tours con rclone

```powershell
# Configuración (solo primera vez)
rclone config create inlaab-r2 s3 `
  provider=Cloudflare `
  access_key_id=TU_ACCESS_KEY `
  secret_access_key=TU_SECRET_KEY `
  endpoint=https://b1dee49271f56ddbbb715cfe9d7083c7.r2.cloudflarestorage.com `
  acl=private

# Subir / sincronizar Tour Oficina
rclone sync "f:/Work/2026/INLAAB/360/oficina" inlaab-r2:inlaab-360/360/oficina --progress

# Subir / sincronizar Tour Sheraton
rclone sync "f:/Work/2026/INLAAB/360/sheraton" inlaab-r2:inlaab-360/360/sheraton --progress
```

> `rclone sync` solo sube archivos nuevos o modificados. Si se interrumpe, volver a correr el mismo comando.

---

## Agregar un nuevo tour

1. Crear carpeta local con el contenido del tour (ej: `f:/Work/2026/INLAAB/360/nuevo-tour/`)
2. Subir a R2: `rclone sync "ruta/local" inlaab-r2:inlaab-360/360/nuevo-tour --progress`
3. En `src/app/metryca/tours/page.tsx` agregar al array `TOURS`:
   ```ts
   {
     slug:  'nuevo-tour',
     title: 'Tour Nuevo',
     subtitle: 'Descripción',
     accent: '#color',
     glow:  'rgba(r,g,b,0.12)',
     delay: 0.6,
   }
   ```
4. Crear `src/app/metryca/tours/nuevo-tour/page.tsx`:
   ```tsx
   import TourViewer from "../TourViewer";
   export default function TourNuevoPage() {
     const url = process.env.TOUR_NUEVO_URL;
     if (!url) return null;
     return <TourViewer url={url} title="Tour Nuevo" />;
   }
   ```
5. Agregar `TOUR_NUEVO_URL=https://media.inlaab.com/360/nuevo-tour/index.html` en Vercel env vars
6. Commit + push → Vercel despliega automáticamente

---

## Despliegue

```
git push origin main → GitHub → Vercel build automático → metryca.inlaab.com
```

El build de Vercel tarda ~1-2 minutos. No requiere intervención manual.

---

## Problemas encontrados y soluciones

| Problema | Causa | Solución |
|----------|-------|----------|
| Input de login no respondía | `ClientLayout` del sitio principal envolvía /metryca con chat overlay | Detectar ruta `/metryca` en `client-layout.tsx` y retornar layout mínimo |
| Tours no cargaban en Android | `.htaccess` bloqueaba requests sin Referer header | `referrerPolicy="origin"` en el iframe + permitir Referer vacío en .htaccess |
| Error 522 en recursos del tour | Cloudflare proxy incompatible con BlueHosting compartido | Migrar tours a Cloudflare R2 |
| PDF viewer bloqueado en tour | CSP `frame-ancestors` bloqueaba iframes anidados en mismo dominio | Agregar `'self'` al CSP |
| SSL no provisionado en Vercel | CAA records no incluían `zerossl.com` | Agregar registros CAA para zerossl.com en Cloudflare |
| Subida FTP interrumpida por corte de luz | - | Usar `rclone sync` que resume automáticamente |
| `next.config.ts` no soportado | Next.js 14 no soporta config en TypeScript | Renombrar a `next.config.mjs` |

---

## Mantenimiento

- **Cambiar código de acceso:** actualizar `ACCESS_CODE` en Vercel dashboard → redeploy automático
- **Actualizar tour:** correr `rclone sync` con la carpeta actualizada
- **Ver logs:** Vercel dashboard → proyecto → Functions tab
- **Rotar JWT secret:** actualizar `JWT_SECRET` en Vercel → todos los usuarios activos deberán volver a ingresar su código

---

*Proyecto desarrollado: Mayo 2026*
