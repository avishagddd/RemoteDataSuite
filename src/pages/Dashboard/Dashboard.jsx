import { useState, useRef, useEffect } from 'react'
import './Dashboard.css'

// ── Report options ───────────────────────────────────────────────

const REPORT_OPTIONS = [
  { id: 'daily-temp',          label: 'Daily Temperature Summary' },
  { id: 'weekly-compliance',   label: 'Weekly Compliance Report'  },
  { id: 'battery-status',      label: 'Battery Status Report'     },
]

// ── ReportDropdown ───────────────────────────────────────────────

function ReportDropdown() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(new Set())
  const wrapperRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function toggle(id) {
    setSelected(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  function clearAll() {
    setSelected(new Set())
  }

  function handleSend() {
    setOpen(false)
  }

  const placeholder = selected.size === 0
  const triggerLabel = placeholder
    ? 'Select reports to download'
    : selected.size === 1
      ? REPORT_OPTIONS.find(o => selected.has(o.id))?.label
      : `${selected.size} reports selected`

  return (
    <div className="report-dropdown" ref={wrapperRef}>
      <button
        className={`report-dropdown-trigger${open ? ' report-dropdown-trigger--open' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={`report-dropdown-label${placeholder ? ' report-dropdown-label--placeholder' : ''}`}>
          {triggerLabel}
        </span>
        <span className={`report-dropdown-chevron${open ? ' report-dropdown-chevron--up' : ''}`} aria-hidden="true">
          <ChevronDownIcon />
        </span>
      </button>

      {open && (
        <div className="report-dropdown-panel" role="listbox" aria-multiselectable="true">
          <ul className="report-dropdown-list">
            {REPORT_OPTIONS.map(option => (
              <li key={option.id}>
                <label className="report-dropdown-item">
                  <input
                    type="checkbox"
                    className="report-checkbox"
                    checked={selected.has(option.id)}
                    onChange={() => toggle(option.id)}
                  />
                  <span className="report-dropdown-item-label">{option.label}</span>
                </label>
              </li>
            ))}
          </ul>
          <div className="report-dropdown-footer">
            <button className="report-dropdown-clear" onClick={clearAll}>Clear all</button>
            <button className="report-dropdown-send" onClick={handleSend}>
              <MailIcon color="#ffffff" />
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Icons ───────────────────────────────────────────────────────
// No asset file — kept inline

function FourtecLogoSmall() {
  return (
    <svg className="header-logo" width="32" height="32" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Fourtec logo">
      <path d="M27.0013 1.90565C13.1626 1.90565 1.90509 13.1621 1.90509 26.9994C1.90509 40.8379 13.1626 52.0943 27.0013 52.0943C40.8374 52.0943 52.0949 40.8379 52.0949 26.9994C52.0955 13.1621 40.8374 1.90565 27.0013 1.90565ZM27.0013 54C12.113 54 0 41.8872 0 26.9994C0 12.114 12.1124 0 27.0013 0C41.887 0 54 12.114 54 26.9994C54 41.8872 41.8876 54 27.0013 54Z" fill="#8CC24E"/>
      <path d="M31.035 24.7592H35.5846C36.6445 24.7592 37.5019 25.6181 37.5019 26.676V29.1301C37.5019 30.188 36.6445 31.0481 35.5846 31.0481H31.035C29.9777 31.0481 29.119 30.188 29.119 29.1301V26.676C29.119 25.6174 29.9777 24.7592 31.035 24.7592Z" fill="#8CC24E"/>
      <path d="M21.2643 46.5827C20.2057 46.5827 19.3419 45.7226 19.3419 44.6647V31.0475H17.0651C16.0078 31.0475 15.1504 30.1874 15.1504 29.1295V26.6754C15.1504 25.615 16.0078 24.7586 17.0651 24.7586H19.3419V16.9227C19.3419 15.8647 20.198 15.0059 21.2579 15.0059H24.9277C25.7011 15.0059 26.333 14.3839 26.333 13.6135L26.3343 11.3597C26.3343 10.2993 27.1916 9.44168 28.2502 9.44168H35.5931C36.6505 9.44168 37.5021 10.2993 37.5021 11.3597V13.8138C37.5021 14.8693 36.6447 15.7293 35.5848 15.7293H27.7299C26.959 15.7293 26.333 16.3551 26.333 17.128V44.6647C26.333 45.7226 25.4769 46.5827 24.4183 46.5827H21.2643Z" fill="#0060A8"/>
    </svg>
  )
}

// log-out.svg
function LogoutIcon({ color = '#004477' }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M7.5 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H7.5M13.3333 14.1667L17.5 10M17.5 10L13.3333 5.83333M17.5 10H7.5" stroke={color} strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

// No asset file — kept inline
function ChevronDownIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M5 7.5L10 12.5L15 7.5" stroke="#535862" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

// play-circle.svg
function PlayCircleIcon({ color = '#535862' }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M10 18.3333C14.6024 18.3333 18.3334 14.6024 18.3334 10C18.3334 5.39762 14.6024 1.66666 10 1.66666C5.39765 1.66666 1.66669 5.39762 1.66669 10C1.66669 14.6024 5.39765 18.3333 10 18.3333Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8.33335 6.66666L13.3334 10L8.33335 13.3333V6.66666Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

// stop-circle.svg
function StopCircleIcon({ color = '#535862' }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M10 18.3333C14.6024 18.3333 18.3334 14.6024 18.3334 10C18.3334 5.39762 14.6024 1.66666 10 1.66666C5.39765 1.66666 1.66669 5.39762 1.66669 10C1.66669 14.6024 5.39765 18.3333 10 18.3333Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12.5 7.5H7.50002V12.5H12.5V7.5Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

// No asset file — kept inline
function BellOffIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="#535862" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M18.63 13A17.888 17.888 0 0 1 18 8" stroke="#535862" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6.26 6.26A5.86 5.86 0 0 0 6 8c0 7-3 9-3 9h14" stroke="#535862" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M18 8a6 6 0 0 0-9.33-5" stroke="#535862" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="1" y1="1" x2="23" y2="23" stroke="#535862" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

// info.svg
function InfoIcon({ color = '#535862' }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M10 13.3334V10M10 6.66669H10.0084M18.3334 10C18.3334 14.6024 14.6024 18.3334 10 18.3334C5.39765 18.3334 1.66669 14.6024 1.66669 10C1.66669 5.39765 5.39765 1.66669 10 1.66669C14.6024 1.66669 18.3334 5.39765 18.3334 10Z" stroke={color} strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

// bell.svg
function BellIcon({ color = '#535862' }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M11.4417 17.5C11.2952 17.7526 11.0849 17.9622 10.8319 18.1079C10.5788 18.2537 10.292 18.3304 10 18.3304C9.70802 18.3304 9.42116 18.2537 9.16814 18.1079C8.91513 17.9622 8.70484 17.7526 8.55833 17.5M15 6.66667C15 5.34059 14.4732 4.06882 13.5355 3.13114C12.5979 2.19346 11.3261 1.66667 10 1.66667C8.67392 1.66667 7.40215 2.19346 6.46447 3.13114C5.52678 4.06882 5 5.34059 5 6.66667C5 12.5 2.5 14.1667 2.5 14.1667H17.5C17.5 14.1667 15 12.5 15 6.66667Z" stroke={color} strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

// No asset file — kept inline
function BatteryIcon({ level = 100 }) {
  const clamped   = Math.max(0, Math.min(100, level))
  const fillWidth = Math.round(14 * clamped / 100)
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="1" y="6" width="18" height="12" rx="2" stroke="#535862" strokeWidth="1.5"/>
      <line x1="23" y1="13" x2="23" y2="11" stroke="#535862" strokeWidth="2" strokeLinecap="round"/>
      {fillWidth > 0 && <rect x="3" y="9" width={fillWidth} height="6" rx="0.5" fill="#535862"/>}
    </svg>
  )
}

// Property 1=temperature.svg
function ThermometerIcon({ fillColor = '#8AB6D7' }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M16 2C17.4927 2 18.9283 2.55222 20.0099 3.54246C21.0915 4.53269 21.7363 5.88516 21.8109 7.32015L21.8182 7.60015L21.8196 17.0196L21.8996 17.1008C23.0647 18.3226 23.7874 19.8748 23.9593 21.5249L23.9898 21.9113L24 22.3006C23.9999 23.5365 23.6907 24.7543 23.0985 25.8509C22.5063 26.9476 21.6486 27.8909 20.5978 28.6013C19.547 29.3116 18.3339 29.768 17.0612 29.9319C15.7885 30.0959 14.4935 29.9626 13.2856 29.5432C12.0777 29.1239 10.9925 28.4308 10.1215 27.5226C9.25058 26.6144 8.61955 25.5178 8.28177 24.3254C7.94398 23.133 7.90936 21.8798 8.18083 20.6718C8.4523 19.4638 9.02189 18.3365 9.84145 17.385L10.1018 17.098L10.1804 17.0182L10.1818 7.60015C10.1817 6.2125 10.7168 4.87422 11.6835 3.84471C12.6501 2.81521 13.9795 2.16781 15.4138 2.028L15.7091 2.007L16 2ZM16 4.80008C15.2661 4.79985 14.5592 5.06665 14.021 5.54699C13.4829 6.02733 13.1532 6.68571 13.0982 7.39015L13.0909 7.60015V18.2306L12.6065 18.6479C11.8478 19.301 11.3099 20.1581 11.0623 21.1084C10.8147 22.0588 10.8687 23.0588 11.2175 23.9792C11.5662 24.8997 12.1937 25.6984 13.0187 26.2722C13.8438 26.846 14.8287 27.1686 15.8461 27.1983C16.8636 27.2279 17.8669 26.9633 18.7266 26.4386C19.5862 25.914 20.2627 25.1533 20.6687 24.2548C21.0747 23.3563 21.1916 22.3613 21.0042 21.3983C20.8168 20.4353 20.3337 19.5484 19.6175 18.8523L19.3949 18.6493L18.9105 18.232L18.9091 7.60015C18.9091 6.85753 18.6026 6.14532 18.057 5.6202C17.5115 5.09508 16.7715 4.80008 16 4.80008ZM16 10.4002C16.3858 10.4002 16.7557 10.5477 17.0285 10.8103C17.3013 11.0729 17.4545 11.429 17.4545 11.8003V19.0917C18.2202 19.4133 18.8475 19.9789 19.2309 20.6934C19.6142 21.4078 19.7303 22.2275 19.5597 23.0147C19.389 23.8018 18.9419 24.5084 18.2936 25.0156C17.6454 25.5228 16.8354 25.7997 16 25.7997C15.1646 25.7997 14.3546 25.5228 13.7064 25.0156C13.0581 24.5084 12.611 23.8018 12.4403 23.0147C12.2697 22.2275 12.3858 21.4078 12.7691 20.6934C13.1525 19.9789 13.7798 19.4133 14.5455 19.0917V11.8003C14.5455 11.429 14.6987 11.0729 14.9715 10.8103C15.2443 10.5477 15.6142 10.4002 16 10.4002Z" fill={fillColor}/>
    </svg>
  )
}

// Property 1=humidity.svg
function DropletIcon({ fillColor = '#8AB6D7' }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M14.9552 2.40316C15.5572 1.85731 16.478 1.86685 17.0686 2.42505C19.2071 4.44629 21.7139 6.92825 23.6894 9.61232C25.6425 12.266 27.2346 15.3261 27.2346 18.4889C27.2346 21.5279 26.0613 24.451 23.9595 26.6129C21.8562 28.7763 18.994 30 16.0001 30C13.0061 30 10.1439 28.7763 8.04065 26.6129C5.9388 24.451 4.7655 21.5279 4.7655 18.4889C4.7655 15.3377 6.30944 12.275 8.2504 9.60788C10.2123 6.912 12.7235 4.42658 14.9552 2.40316ZM10.7659 11.4385C8.96897 13.9077 7.87661 16.3141 7.87661 18.4889C7.87661 20.7306 8.74282 22.872 10.2713 24.4442C11.7983 26.0149 13.86 26.8889 16.0001 26.8889C18.1402 26.8889 20.2018 26.0149 21.7288 24.4442C23.2573 22.872 24.1235 20.7306 24.1235 18.4889C24.1235 16.3257 23.0055 13.9317 21.1837 11.4565C19.6775 9.40996 17.7977 7.44975 15.9816 5.69005C14.1321 7.43218 12.2549 9.39239 10.7659 11.4385Z" fill={fillColor}/>
      <path fillRule="evenodd" clipRule="evenodd" d="M10.7707 16.8533C11.5888 16.7225 12.3579 17.2796 12.4887 18.0976C12.7593 19.7901 13.4142 20.9448 14.9906 21.9845C15.6821 22.4406 15.873 23.371 15.4168 24.0626C14.9607 24.7541 14.0303 24.945 13.3388 24.4888C11.01 22.9528 9.91998 21.0332 9.52636 18.5713C9.39557 17.7532 9.95269 16.9841 10.7707 16.8533Z" fill={fillColor}/>
    </svg>
  )
}

// mail.svg
function MailIcon({ color = '#004477' }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M18.3334 5.00001C18.3334 4.08334 17.5834 3.33334 16.6667 3.33334H3.33335C2.41669 3.33334 1.66669 4.08334 1.66669 5.00001M18.3334 5.00001V15C18.3334 15.9167 17.5834 16.6667 16.6667 16.6667H3.33335C2.41669 16.6667 1.66669 15.9167 1.66669 15V5.00001M18.3334 5.00001L10 10.8333L1.66669 5.00001" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

// ── AlarmPanel ──────────────────────────────────────────────────

function CloseIcon({ color = '#A4A7AE' }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M15 5L5 15M5 5L15 15" stroke={color} strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function AlarmPanel({ deviceName, hasAlarm, alarmCount, onClose }) {
  const accentColor = hasAlarm ? '#B42318' : '#535862'
  const accentBg    = hasAlarm ? '#FEF3F2' : '#F8F9FA'

  return (
    <div className="alarm-overlay" onClick={onClose}>
      <div className="alarm-panel" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="alarm-panel-header">
          <div className="alarm-header-left">
            <div className={`alarm-header-icon ${hasAlarm ? 'alarm-header-icon--error' : 'alarm-header-icon--muted'}`}>
              <BellIcon color={accentColor} />
            </div>
            <div className="alarm-header-title-group">
              <span className="alarm-panel-title">Alarms - {deviceName}</span>
              <span className="alarm-header-subtitle">{alarmCount} active alarm{alarmCount !== 1 ? 's' : ''}</span>
            </div>
          </div>
          <button className="alarm-panel-close" onClick={onClose} aria-label="Close">
            <CloseIcon />
          </button>
        </div>

        {/* Alarm list */}
        <ul className="alarm-list">
          {hasAlarm ? (
            (() => {
              const sampleAlarm = {
                type: 'Temperature',
                from: '12/14/2024, 02:20 PM',
                to: '12/14/2024, 04:45 PM'
              }
              const alarms = Array.from({ length: Math.max(1, alarmCount) }, (_, i) => ({ ...sampleAlarm, id: i }))
              return alarms.flatMap((a, idx) => {
                const item = (
                  <li key={`alarm-${a.id}`} className="alarm-entry">
                    <div className="alarm-entry-icon">
                      <ThermometerIcon fillColor={accentColor} />
                    </div>
                    <div className="alarm-entry-body">
                      <span className={`alarm-entry-name ${hasAlarm ? 'alarm-entry-name--error' : ''}`}>{a.type}</span>
                      <div className="alarm-entry-detail"><span className="alarm-entry-detail-label">From</span><span className="alarm-entry-detail-text">{a.from}</span></div>
                      <div className="alarm-entry-detail"><span className="alarm-entry-detail-label">To</span><span className="alarm-entry-detail-text">{a.to}</span></div>
                    </div>
                  </li>
                )
                if (idx < alarms.length - 1) {
                  return [item, <div key={`divider-${a.id}`} className="alarm-entry-divider" />]
                }
                return [item]
              })
            })()
          ) : (
            (() => {
              const inactiveColor = '#A4A7AE'
              const sampleInactive = {
                type: 'Humidity',
                from: '12/14/2024, 02:20 PM',
                to: '12/14/2024, 04:45 PM',
                id: 0
              }
              return (
                <>
                  <li className="alarm-entry">
                    <div className="alarm-entry-icon">
                      <DropletIcon fillColor={inactiveColor} />
                    </div>
                    <div className="alarm-entry-body">
                      <span className={`alarm-entry-name alarm-entry-name--muted`}>{sampleInactive.type}</span>
                      <div className="alarm-entry-detail"><span className="alarm-entry-detail-label">From</span><span className="alarm-entry-detail-text">{sampleInactive.from}</span></div>
                      <div className="alarm-entry-detail"><span className="alarm-entry-detail-label">To</span><span className="alarm-entry-detail-text">{sampleInactive.to}</span></div>
                    </div>
                  </li>
                </>
              )
            })()
          )}
        </ul>

      </div>
    </div>
  )
}

// ── InfoPanel ──────────────────────────────────────────────────
function InfoPanel({ deviceName, onClose }) {
  return (
    <div className="alarm-overlay" onClick={onClose}>
      <div className="alarm-panel" onClick={e => e.stopPropagation()}>
        <div className="info-panel-header">
          <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
            <div className="alarm-header-icon info-header-icon"><InfoIcon color="#414651" /></div>
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <span className="alarm-panel-title">{deviceName}</span>
            </div>
          </div>
          <button className="alarm-panel-close" onClick={onClose} aria-label="Close">
            <CloseIcon />
          </button>
        </div>

        <div className="info-content">
          {/* Table header */}
          <div className="info-row info-row--header">
            <div className="info-row-label"></div>
            <div className="info-row-measured">Measured</div>
            <div className="info-row-limit">Alert Limits</div>
          </div>
          <div className="info-row">
            <div className="info-row-label">
              <span className="info-row-icon"><ThermometerIcon /></span>
              Temperature Min
            </div>
            <div className="info-row-measured">27°C</div>
            <div className="info-row-limit">75%</div>
          </div>
          <div className="info-row">
            <div className="info-row-label">
              <span className="info-row-icon"><ThermometerIcon /></span>
              Temperature Max
            </div>
            <div className="info-row-measured">24°C</div>
            <div className="info-row-limit">Level 3</div>
          </div>
          <div className="info-row">
            <div className="info-row-label">
              <span className="info-row-icon"><DropletIcon /></span>
              Humidity Min
            </div>
            <div className="info-row-measured">27°C</div>
            <div className="info-row-limit">Level 3</div>
          </div>
          <div className="info-row">
            <div className="info-row-label">
              <span className="info-row-icon"><DropletIcon /></span>
              Humidity Max
            </div>
            <div className="info-row-measured">60%</div>
            <div className="info-row-limit">Level 3</div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── DeviceCard ──────────────────────────────────────────────────

function DeviceCard({ id, name, serialNumber, version, sampleRate, battery, temperature, humidity, isRunning, alarmCount, hasAlarm, onToggleRun }) {
  const [alarmOpen, setAlarmOpen] = useState(false)
  const [infoOpen, setInfoOpen] = useState(false)
  const alarmColor = hasAlarm ? '#B42318' : '#535862'

  return (
    <div className={`device-card ${isRunning ? 'device-card--active' : 'device-card--inactive'}`}>

      {alarmOpen && (
        <AlarmPanel
          deviceName={name}
          hasAlarm={hasAlarm}
          alarmCount={alarmCount}
          onClose={() => setAlarmOpen(false)}
        />
      )}

      {infoOpen && (
        <InfoPanel
          deviceName={name}
          onClose={() => setInfoOpen(false)}
        />
      )}

      {/* ── Card header: name + action icons ── */}
      <div className="card-header-row">
        <h2 className="device-name">{name}</h2>
        <div className="device-icon-actions">
          <button className="icon-btn" aria-label="Device info" onClick={() => setInfoOpen(true)}>
            <InfoIcon />
          </button>
          <button className="bell-btn" aria-label={`${alarmCount} alarm${alarmCount !== 1 ? 's' : ''}`} onClick={() => setAlarmOpen(true)}>
            <BellIcon color={alarmColor} />
            <span className="alarm-count" style={{ color: alarmColor }}>{alarmCount}</span>
          </button>
        </div>
      </div>

      {/* ── Metadata row 1: S/N + Version ── */}
      <div className="meta-row">
        <span className="meta-item">
          <span className="meta-label">S/N</span> {serialNumber}
        </span>
        <span className="meta-item">
          <span className="meta-label">Version</span> {version}
        </span>
      </div>

      {/* ── Metadata row 2: Sample Rate + Battery ── */}
      <div className="meta-row">
        <span className="meta-item">
          <span className="meta-label">Sample Rate</span> {sampleRate}
        </span>
        <button className="battery-btn" aria-label={`Battery ${battery}`}>
          <BatteryIcon level={parseInt(battery, 10) || 0} />
          <span>{battery}</span>
        </button>
      </div>

      {/* ── Measurements ── */}
      <div className="measurements">
        <div className="measurement-tile">
          <ThermometerIcon />
          <div className="measurement-data">
            <span className="measurement-label">Temperature</span>
            <span className="measurement-value">{temperature}</span>
          </div>
        </div>
        <div className="measurement-tile">
          <DropletIcon />
          <div className="measurement-data">
            <span className="measurement-label">Humidity</span>
            <span className="measurement-value">{humidity}</span>
          </div>
        </div>
      </div>

      {/* ── Primary action ── */}
      {isRunning ? (
        <button className="btn-stop" onClick={() => onToggleRun(id)}>
          <StopCircleIcon color="#414651" />
          Stop
        </button>
      ) : (
        <button className="btn-run" onClick={() => onToggleRun(id)}>
          <PlayCircleIcon color="#ffffff" />
          Run
        </button>
      )}

      {/* ── Send report ── */}
      <button className="send-report-btn">
        <MailIcon />
        Send Boumerang Report
      </button>
    </div>
  )
}

// ── Dashboard ───────────────────────────────────────────────────

export default function Dashboard({ onLogout }) {
  // ניהול רשימת המכשירים ב-State כדי לאפשר שינויים דינמיים
  const [devices, setDevices] = useState([
    { id: 1, name: 'BlueLite 1', serialNumber: '12345678', version: '5.17', sampleRate: '1 sec', battery: '50%', temperature: '24.2°c', humidity: '38%', isRunning: true, alarmCount: 2, hasAlarm: true },
    { id: 2, name: 'DataNet23', serialNumber: '87654321', version: '5.17', sampleRate: '1 sec', battery: '80%', temperature: '22.0°c', humidity: '40%', isRunning: false, alarmCount: 1, hasAlarm: false },
  ])

  const handleToggleRun = (id) => {
    setDevices(prev => prev.map(d => d.id === id ? { ...d, isRunning: !d.isRunning } : d))
  }

  const handleRunAll = () => {
    setDevices(prev => prev.map(d => ({ ...d, isRunning: true })))
  }

  const handleStopAll = () => {
    setDevices(prev => prev.map(d => ({ ...d, isRunning: false })))
  }

  return (
    <div className="dashboard-screen">

      {/* ── Header ── */}
      <header className="dashboard-header">
        <div className="header-brand">
          <FourtecLogoSmall />
          <div className="header-title-group">
            <span className="header-title">Remote DataSuite</span>
            <span className="header-subtitle">DS-2024-001</span>
          </div>
        </div>
        <button className="header-logout-btn" aria-label="Log out" onClick={onLogout}>
          <LogoutIcon />
        </button>
      </header>

      {/* ── Content ── */}
      <div className="dashboard-content">

        {/* Report select */}
        <ReportDropdown />

        {/* Toolbar */}
        <div className="toolbar">
          <div className="toolbar-left">
            <button className="ghost-btn" onClick={handleRunAll}>
              <PlayCircleIcon />
              Run All
            </button>
            <button className="ghost-btn" onClick={handleStopAll}>
              <StopCircleIcon />
              Stop All
            </button>
          </div>
          <button className="ghost-btn">
            <BellOffIcon />
            Mute Alarms
          </button>
        </div>

        {/* Device cards */}
        {devices.map(device => (
          <DeviceCard
            key={device.id}
            {...device}
            onToggleRun={handleToggleRun}
          />
        ))}

      </div>
    </div>
  )
}
