import { photoInfo, photoSize, type PhotoKey } from '../../data/photos'
import { asset } from '../../lib/asset'

interface Props {
  name: PhotoKey
  sizes: string
  className?: string
  imgClassName?: string
  /** Above-the-fold images load eagerly with high priority. */
  priority?: boolean
  /** Show the "Kuvituskuva" badge (default true – every photo on this site is illustrative). */
  badge?: boolean
}

/** Responsive <picture> (WebP + JPEG) with intrinsic size to prevent layout shift. */
export function Photo({ name, sizes, className = '', imgClassName = '', priority = false, badge = true }: Props) {
  const { widths, width, height } = photoSize(name)
  const info = photoInfo[name]
  const set = (ext: string) => widths.map((w) => `${asset(`images/${name}-${w}.${ext}`)} ${w}w`).join(', ')
  return (
    <figure className={`overflow-hidden ${/\b(absolute|fixed)\b/.test(className) ? '' : 'relative'} ${className}`}>
      <picture>
        <source type="image/webp" srcSet={set('webp')} sizes={sizes} />
        <img
          src={asset(`images/${name}-${widths[Math.min(1, widths.length - 1)]}.jpg`)}
          srcSet={set('jpg')}
          sizes={sizes}
          width={width}
          height={height}
          alt={info.alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : 'auto'}
          className={`h-full w-full object-cover ${imgClassName}`}
          style={info.focus ? { objectPosition: info.focus } : undefined}
        />
      </picture>
      {badge && (
        <figcaption className="photo-badge" aria-hidden="true">
          Kuvituskuva
        </figcaption>
      )}
    </figure>
  )
}
