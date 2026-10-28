import { useMemo, useState } from 'react'
import type { InvitationTemplateProps } from '@/invitation-engine/types'
import { useCountdown, useReveal, formatDayDate, formatShortDate, formatTime, parseEventDate } from '@/invitation-engine/shared/hooks'
import { useMusic, useLightbox } from '@/invitation-engine/shared/media'
import { useWishes, useRsvpSubmit } from '@/invitation-engine/shared/guestbook'
import { LazyImg, copyText } from '@/invitation-engine/shared/ui'
import './heritage-aruna.css'

const T = '/templates/heritage-aruna'
const img = (f: string) => `${T}/images/${f}`

const DEFAULT_QUOTE = '“Dan segala sesuatu Kami ciptakan berpasang-pasangan agar kamu mengingat (kebesaran Allah)”'

function Reveal({ children, className = '', variant = 'up', delay = 0 }: {
  children: React.ReactNode
  className?: string
  variant?: 'up' | 'zoom' | 'right'
  delay?: number
}) {
  const { ref, visible } = useReveal()
  const variantClass = variant === 'zoom' ? 'cr-ha-reveal--zoom' : variant === 'right' ? 'cr-ha-reveal--right' : ''
  return (
    <Tag
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`cr-ha-reveal ${variantClass} ${visible ? 'cr-ha-reveal--visible' : ''} ${className}`}
    >
      {children}
    </Tag>
  )
}

export default function HeritageAruna({ event, guestName }: InvitationTemplateProps) {
  const [opened, setOpened] = useState(false)
  const music = useMusic(event.music_url)
  const countdown = useCountdown(event.akad_date || event.reception_date)
  const { wishes, addWish } = useWishes(event.id)
  const { submitting, submitRsvp } = useRsvpSubmit(event.id)
  const gallery = useMemo(
    () => [...(event.gallery ?? []), ...(event.prewedding_photos ?? [])],
    [event.gallery, event.prewedding_photos],
  )
  const lightbox = useLightbox(gallery)

  const brideFirst = event.bride_nick || event.bride_name || ''
  const groomFirst = event.groom_nick || event.groom_name || ''
  const coupleShort = [brideFirst, groomFirst].filter(Boolean).join(' & ')

  const openInvitation = () => {
    setOpened(true)
    music.start()
  }

  const googleCalendarUrl = useMemo(() => {
    const d = parseEventDate(event.akad_date || event.reception_date, event.akad_time || event.reception_time)
    if (!d) return null
    const pad = (n: number) => String(n).padStart(2, '0')
    const start = `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`
    const end = `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours() + 1)}${pad(d.getMinutes())}00`
    const title = `Pernikahan ${coupleShort}`
    const loc = event.akad_location || event.reception_location || ''
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${start}/${end}&location=${encodeURIComponent(loc)}`
  }, [event.akad_date, event.reception_date, event.akad_time, event.reception_time, event.akad_location, event.reception_location, coupleShort])

  const waConfirm = event.gift_wa
    ? `https://wa.me/${event.gift_wa.replace(/\D/g, '')}?text=${encodeURIComponent(`Assalamualaikum, saya ingin mengonfirmasi pengiriman kado untuk pernikahan ${coupleShort || event.title || ''}.`) }`
    : null

  return (
    <div className='cr-heritage-aruna'>
      <div className='cr-ha-bg' aria-hidden='true' />

      {/* ============ COVER OVERLAY ============ */}
      <section className={`cr-ha-cover ${opened ? 'cr-ha-cover--open' : 'cr-ha-cover--closed'} ${window.innerWidth >= 992 ? 'cr-ha-cover--desktop' : ''}`} aria-hidden={opened}>
        <div className='cr-ha-cover-inner'>
          <LazyImg eager src={img('Illustrasi-01-Orn-3-1024x912.webp')} className='cr-ha-cover-orn cr-ha-cover-orn--tl' alt='' />
          <LazyImg eager src={img('Illustrasi-Orn.webp')} className='cr-ha-cover-orn cr-ha-cover-orn--tr' alt='' />          <div className='cr-ha-cover-card'>
            <p className='cr-ha-cover-label'>The Wedding Of</p>
            <h1 className='cr-ha-cover-names'>{coupleShort || 'Mempelai'}</h1>
            <p className='cr-ha-cover-to'>Yth. Bapak/Ibu/Saudara/i</p>
            <p className='cr-ha-cover-guest'>{guestName}</p>
          </div>
          <button className='cr-ha-envelope-btn' onClick={openInvitation} aria-label='Buka undangan'>
            <div className='cr-ha-envelope'>
              <LazyImg eager src={img('Aruna-Amplop.webp')} alt='Amplop undangan' />
              <LazyImg eager src={img('Aruna-WAX-SEAL-3-1.webp')} className='cr-ha-seal cr-ha-cr-seal-swing' alt='' />
            </div>
            <p className='cr-ha-open-label'>BUKA UNDANGAN</p>
          </button>
        </div>
      </section>

      {/* ============ PAGE ============ */}
      <div className={`cr-ha-page ${opened ? 'cr-ha-page--shown' : ''}`}>
        {/* PANEL KIRI (desktop sticky; mobile: bagian atas) */}
        <aside className='cr-ha-side'>
          <div className='cr-ha-side-inner'>
            <p className='cr-ha-hero-title'>The Wedding Of</p>
            <h1 className='cr-ha-hero-names'>{coupleShort || 'Mempelai'}</h1>
            <p className='cr-ha-side-quote'>{(event.quote || "I love you, I am who I am because of you. You are every reason, every hope and every dream I've ever had.").replace(/["\n]+/g, ' ')}</p>
          </div>
        </aside>

        {/* KANAN: kolom scroll */}
        <main className='cr-ha-scroll'>
          <div className='cr-ha-bg' aria-hidden='true' />

        {/* QUOTE */}
        <section className='cr-ha-section cr-ha-section--quote'>
          <div className='cr-ha-quote-envelopewrap'>
            <LazyImg src={img('Aruna-Amplop.webp')} alt='' />
            <LazyImg src={img('Aruna-WAX-SEAL-3-1.webp')} className='cr-ha-quote-seal cr-ha-cr-seal-swing' alt='' />
          </div>
          <Reveal>
            <div className='cr-ha-quote-text'>
              {(event.quote || DEFAULT_QUOTE).split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </Reveal>
          <p className='cr-ha-story-note'><span className='cr-ha-typing'>the story begins...</span></p>
        </section>

        {/* COUPLE */}
        <section className='cr-ha-section cr-ha-couple'>
          <Reveal className='cr-ha-couple-intro'>
            <h2 className='cr-ha-title'>Bride &amp; Groom</h2>
            {event.notes && <p className='cr-ha-body' style={{ marginTop: 10 }}>{event.notes}</p>}
          </Reveal>
          <div className='cr-ha-couple-grid'>
            <Reveal>
              <div className='cr-ha-person'>
                <div className='cr-ha-person-visual'>
                  <div className='cr-ha-person-photo'>
                    <LazyImg src={event.bride_photo} alt={event.bride_name || ''} />
                  </div>
                  <LazyImg src={img('Aruna-Frame-Mempelai.webp')} className='cr-ha-person-frame' alt='' />
                  <div className='cr-ha-person-text'>
                    <p className='cr-ha-person-name'>{brideFirst || 'Bride'}</p>
                    <p className='cr-ha-person-full'>{event.bride_name}</p>
                    <p className='cr-ha-person-parents'>
                      {`Putri Pertama dari\n${event.bride_father ?? ''}\n&\n${event.bride_mother ?? ''}`}
                    </p>
                    {event.bride_ig && (
                      <a className='cr-ha-person-ig' href={event.bride_ig.startsWith('http') ? event.bride_ig : `https://instagram.com/${event.bride_ig}`} target='_blank' rel='noreferrer'>
                        @ {event.bride_ig}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
            <span className='cr-ha-ampersand'>&</span>
            <Reveal>
              <div className='cr-ha-person'>
                <div className='cr-ha-person-visual'>
                  <div className='cr-ha-person-photo'>
                    <LazyImg src={event.groom_photo} alt={event.groom_name || ''} />
                  </div>
                  <LazyImg src={img('Aruna-Frame-Mempelai.webp')} className='cr-ha-person-frame' alt='' />
                  <div className='cr-ha-person-text'>
                    <p className='cr-ha-person-name'>{groomFirst || 'Groom'}</p>
                    <p className='cr-ha-person-full'>{event.groom_name}</p>
                    <p className='cr-ha-person-parents'>
                      {`Putra Pertama dari\n${event.groom_father ?? ''}\n&\n${event.groom_mother ?? ''}`}
                    </p>
                    {event.groom_ig && (
                      <a className='cr-ha-person-ig' href={event.groom_ig.startsWith('http') ? event.groom_ig : `https://instagram.com/${event.groom_ig}`} target='_blank' rel='noreferrer'>
                        @ {event.groom_ig}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* TIMELINE */}
        {(event.love_story ?? '').trim() !== '' && (
          <section className='cr-ha-section cr-ha-timeline'>
            <Reveal>
              <h2 className='cr-ha-title'>Journey of Love</h2>
            </Reveal>
            <div className='cr-ha-timeline-list'>
              {(event.love_story ?? '').split(/\n{2,}/).filter(Boolean).map((item, i) => (
                <Reveal key={i} className='cr-ha-timeline-item'>
                  <div className='cr-ha-timeline-card'>{item}</div>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* SAVEDATE */}
        {(event.akad_date || event.reception_date) && (
          <section className='cr-ha-section cr-ha-savedate'>
            <Reveal>
              <h2 className='cr-ha-title'>Save the Date</h2>
            </Reveal>
            <p className='cr-ha-body' style={{ marginTop: 6 }}>{formatShortDate(event.akad_date || event.reception_date)}</p>
            {countdown && !countdown.finished && (
              <div className='cr-ha-countdown'>
                {([
                  ['Hari', countdown.days], ['Jam', countdown.hours],
                  ['Menit', countdown.minutes], ['Detik', countdown.seconds],
                ] as const).map(([lbl, val]) => (
                  <div className='cr-ha-count-item' key={lbl}>
                    <div className='cr-ha-count-ring'><div className='cr-ha-count-inner'>
                      <span className='cr-ha-count-num'>{String(val).padStart(2, '0')}</span>
                      <span className='cr-ha-count-lbl'>{lbl}</span>
                    </div></div>
                  </div>
                ))}
              </div>
            )}
            {googleCalendarUrl && (
              <a className='cr-ha-btn-reminder' href={googleCalendarUrl} target='_blank' rel='noreferrer'>INGATKAN ACARA</a>
            )}
          </section>
        )}

        {/* EVENTS */}
        {(event.akad_date || event.reception_date) && (
          <section className='cr-ha-section cr-ha-events'>
            <Reveal>
              <h2 className='cr-ha-title'>Akad &amp; Resepsi</h2>
            </Reveal>
            <div className='cr-ha-event-grid'>
              {event.akad_date && (
                <Reveal>
                  <div className='cr-ha-event-card'>
                    <p className='cr-ha-subtitle'>Akad</p>
                    <p className='cr-ha-event-time'>{formatTime(event.akad_time)}</p>
                    <p className='cr-ha-event-time' style={{ fontSize: 20 }}>{formatDayDate(event.akad_date)}</p>
                    {event.akad_location && <p className='cr-ha-event-place'>{event.akad_location}</p>}
                    {event.address && (
                      <p className='cr-ha-event-addr'>{event.address}</p>
                    )}
                    {event.maps_url && <a className='cr-ha-btn-map' href={event.maps_url} target='_blank' rel='noreferrer'>LIHAT LOKASI</a>}
                  </div>
                </Reveal>
              )}
              {event.reception_date && (
                <Reveal>
                  <div className='cr-ha-event-card'>
                    <p className='cr-ha-subtitle'>Resepsi</p>
                    <p className='cr-ha-event-time'>{formatTime(event.reception_time)}</p>
                    <p className='cr-ha-event-time' style={{ fontSize: 20 }}>{formatDayDate(event.reception_date)}</p>
                    {event.reception_location && <p className='cr-ha-event-place'>{event.reception_location}</p>}
                    {event.maps_url && <a className='cr-ha-btn-map' href={event.maps_url} target='_blank' rel='noreferrer'>LIHAT LOKASI</a>}
                  </div>
                </Reveal>
              )}
            </div>
          </section>
        )}

        {/* DRESSCODE */}
        {event.dress_code && (
          <section className='cr-ha-section cr-ha-dresscode'>
            <Reveal>
              <h2 className='cr-ha-title'>Dresscode</h2>
              <p className='cr-ha-body cr-ha-dresscode-text'>{event.dress_code}</p>
            </Reveal>
          </section>
        )}

        {/* GALLERY */}
        {gallery.length > 0 && (
          <section className='cr-ha-section cr-ha-gallery'>
            <Reveal>
              <h2 className='cr-ha-title'>A Potrait of {coupleShort || 'Love'}</h2>
            </Reveal>
            <div className='cr-ha-gallery-grid'>
              {gallery.map((src, i) => (
                <div key={i} className='cr-ha-gallery-item' onClick={() => lightbox.open(i)}>
                  <LazyImg src={src} alt={`Galeri ${i + 1}`} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* RSVP + WISHES */}
        <section className='cr-ha-section cr-ha-rsvp'>
          <Reveal>
            <h2 className='cr-ha-title'>RSVP &amp; Wishes</h2>
          </Reveal>
          <form
            className='cr-ha-form'
            onSubmit={async (e) => {
              e.preventDefault()
              const form = e.currentTarget
              const fd = new FormData(form)
              const name = String(fd.get('name') ?? guestName)
              const attendance = (String(fd.get('attendance')) as 'yes' | 'no' | 'maybe') || 'yes'
              const res = await submitRsvp({
                name,
                attendance,
                guest_count: Number(fd.get('guest_count') ?? 1) || 1,
                note: String(fd.get('note') ?? ''),
              })
              if (res.error) alert(res.error)
              else alert('Terima kasih! Konfirmasi Anda telah kami terima.')
              form.reset()
            }}
          >
            <div className='cr-ha-field'>
              <label htmlFor='ha-rsvp-name'>Nama</label>
              <input id='ha-rsvp-name' name='name' defaultValue={guestName} required />
            </div>
            <div className='cr-ha-field'>
              <label>Konfirmasi Kehadiran</label>
              <div className='cr-ha-radio-row'>
                <label><input type='radio' name='attendance' value='yes' defaultChecked /> Hadir</label>
                <label><input type='radio' name='attendance' value='no' /> Tidak Hadir</label>
              </div>
            </div>
            <div className='cr-ha-field'>
              <label htmlFor='ha-rsvp-count'>Jumlah Tamu</label>
              <select id='ha-rsvp-count' name='guest_count' defaultValue='1'>
                <option value='1'>1 Orang</option>
                <option value='2'>2 Orang</option>
                <option value='3'>3 Orang</option>
                <option value='4'>4 Orang</option>
                <option value='5'>5 Orang</option>
              </select>
            </div>
            <button className='cr-ha-submit' disabled={submitting} type='submit'>
              {submitting ? 'Mengirim…' : 'KIRIM RSVP'}
            </button>
          </form>

          <form
            className='cr-ha-form'
            onSubmit={async (e) => {
              e.preventDefault()
              const form = e.currentTarget
              const fd = new FormData(form)
              const res = await addWish(String(fd.get('wname') ?? ''), String(fd.get('msg') ?? ''))
              if (res.error) alert(res.error)
              else alert('Doa dan ucapan Anda telah dikirim. Menunggu persetujuan.') 
              form.reset()
            }}
          >
            <p className='cr-ha-subtitle' style={{ marginTop: 30 }}>Doa &amp; Ucapan</p>
            <div className='cr-ha-field'>
              <label htmlFor='ha-wish-name'>Nama</label>
              <input id='ha-wish-name' name='wname' defaultValue={guestName} required />
            </div>
            <div className='cr-ha-field'>
              <label htmlFor='ha-wish-msg'>Ucapan</label>
              <textarea id='ha-wish-msg' name='msg' required />
            </div>
            <button className='cr-ha-submit' type='submit'>KIRIM DOA</button>
            <p className='cr-ha-wish-note'>* Ucapan tampil setelah disetujui oleh pengantin</p>
          </form>
          {wishes.length > 0 && (
            <div className='cr-ha-wish-list'>
              {wishes.map((w) => (
                <div key={w.id} className='cr-ha-wish-item'>
                  <p className='cr-ha-wish-name'>{w.name}</p>
                  <p className='cr-ha-wish-msg'>{w.message}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* GIFT */}
        {(
          [
            event.gift_bank_name,
            event.gift_account_number,
            event.gift_address,
          ].some(Boolean)
        ) && (
          <section className='cr-ha-section cr-ha-gift'>
            <Reveal>
              <h2 className='cr-ha-title'>Wedding Gift</h2>
            </Reveal>
            <div className='cr-ha-gift-grid'>
              {event.gift_bank_name && event.gift_account_number && (
                <Reveal>
                  <div className='cr-ha-gift-card'>
                    <div className='cr-ha-gift-card-inner'>
                      <p className='cr-ha-gift-label'>E-Amplop</p>
                      <p className='cr-ha-gift-bank'>{event.gift_bank_name}</p>
                      <p className='cr-ha-gift-number'>{event.gift_account_number}</p>
                      {event.gift_account_holder && <p className='cr-ha-gift-number'>{event.gift_account_holder}</p>}
                      <button
                        className='cr-ha-gift-copy'
                        type='button'
                        onClick={async () => {
                          const ok = await copyText(event.gift_account_number ?? '')
                          alert(ok ? 'Nomor rekening disalin' : 'Gagal menyalin')
                        }}
                      >
                        SALIN NO. REKENING
                      </button>
                    </div>
                  </div>
                </Reveal>
              )}
              {event.gift_address && (
                <Reveal>
                  <div className='cr-ha-gift-card'>
                    <div className='cr-ha-gift-card-inner'>
                      <p className='cr-ha-gift-label'>Kirim Kado</p>
                      <p className='cr-ha-gift-addr'>{event.gift_address}</p>
                      {waConfirm && (
                        <a className='cr-ha-btn-map' href={waConfirm} target='_blank' rel='noreferrer'>KONFIRMASI VIA WHATSAPP</a>
                      )}
                    </div>
                  </div>
                </Reveal>
              )}
            </div>
          </section>
        )}

        {/* CLOSING */}
        <section className='cr-ha-closing'>
          <div className='cr-ha-closing-inner'>
            <p className='cr-ha-body'>Dengan cinta,</p>
            <p className='cr-ha-closing-names'>{coupleShort || 'Mempelai'}</p>
            <p className='cr-ha-closing-note'>the end...</p>
          </div>
        </section>
        </main>
      </div>

      {/* LIGHTBOX */}
      {lightbox.index !== null && gallery[lightbox.index] && (
        <div className='cr-ha-lightbox' onClick={lightbox.close}>
          <button className='cr-ha-lightbox-close' onClick={lightbox.close} aria-label='Tutup'>✕</button>
          <img src={gallery[lightbox.index]} alt='' onClick={(e) => e.stopPropagation()} />
          <button className='cr-ha-lightbox-nav' style={{ left: 0 }} onClick={(e) => { e.stopPropagation(); lightbox.prev() }} aria-label='Sebelumnya'>‹</button>
          <button className='cr-ha-lightbox-nav' style={{ right: 0 }} onClick={(e) => { e.stopPropagation(); lightbox.next() }} aria-label='Berikutnya'>›</button>
        </div>
      )}

      {/* MUSIC */}
      {event.music_url && (
        <button
          className={`cr-ha-music ${music.playing ? 'cr-ha-music--spin' : ''}`}
          onClick={() => (opened ? music.toggle() : music.toggle())}
          aria-label={music.playing ? 'Matikan musik' : 'Nyalakan musik'}
        >
          {music.playing ? '♪' : '⏸'}
        </button>
      )}
    </div>
  )
}
