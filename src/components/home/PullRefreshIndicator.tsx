interface Props {
  pullDistance: number
  isRefreshing: boolean
  isReady: boolean
}

export function PullRefreshIndicator({ pullDistance, isRefreshing, isReady }: Props) {
  if (pullDistance === 0 && !isRefreshing) return null

  const visible = isRefreshing || pullDistance > 10

  return (
    <div style={{
      position: 'fixed',
      top: `max(calc(56px + ${isRefreshing ? 16 : pullDistance * 0.3}px), 80px)`,
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 60,
      opacity: visible ? 1 : 0,
      transition: isRefreshing ? 'none' : 'opacity 150ms ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '32px',
      height: '32px',
      backgroundColor: 'white',
      borderRadius: '50%',
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    }}>
      {isRefreshing ? (
        <div style={{
          width: '18px',
          height: '18px',
          border: '2px solid var(--color-border)',
          borderTopColor: 'var(--color-primary)',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }} />
      ) : (
        <svg
          width="18" height="18"
          viewBox="0 0 24 24"
          style={{
            transform: `rotate(${isReady ? 180 : Math.min(pullDistance * 2, 160)}deg)`,
            transition: 'transform 100ms ease',
            color: isReady ? 'var(--color-primary)' : 'var(--color-text-muted)',
          }}
        >
          <path
            d="M12 4v12m0 0l-4-4m4 4l4-4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      )}
    </div>
  )
}
