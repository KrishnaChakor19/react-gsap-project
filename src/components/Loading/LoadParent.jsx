import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import LoadChild from './LoadChild'

const LoadParent = ({ onComplete }) => {
  const barRefs = useRef([])
  const logoRef = useRef()
  const wrapperRef = useRef()

  useEffect(() => {
    barRefs.current = barRefs.current.slice(0, 3)

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(wrapperRef.current, {
          opacity: 0,
          duration: 0.6,
          pointerEvents: 'none',
          onComplete: () => onComplete && onComplete(),
        })
      },
    })

    tl.fromTo(
      logoRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 }
    )

    tl.to(
      barRefs.current,
      { width: '100%', duration: 0.8, stagger: 0.15, ease: 'power2.out' },
      '-=0.3'
    )

    tl.to(logoRef.current, { scale: 0.96, duration: 0.6, ease: 'power2.out' }, '+=0.2')

    tl.to(wrapperRef.current, { y: -30, opacity: 0, duration: 0.8, delay: 0.2 })
  }, [onComplete])

  return (
    <div ref={wrapperRef} className="fixed inset-0 z-[9999] flex items-center justify-center bg-black">
      <div className="text-center">
        <h1 ref={logoRef} className="text-[18vw] font-black text-white leading-none uppercase glow" style={{ opacity: 0 }}>
          AROCK
          <span className="text-[3.5vw] ml-[0.3vw] translate-y-[0.25em]">®</span>
        </h1>

        <div className="mt-8 space-y-2 w-[30vw] min-w-[220px]">
          {[0, 1, 2].map((i) => (
            <LoadChild key={i} ref={(el) => (barRefs.current[i] = el)} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default LoadParent