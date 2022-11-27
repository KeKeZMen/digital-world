import { useEffect, useState } from 'react'

import "../assets/styles/slider.scss"
import vector from "../assets/images/vector.svg"

export default function Slider({ children, elWidth = 200, elsCount = 1, buttons = true, dots = false}) {
  const [activeSlide, setActiveSlide] = useState(0)
  let startX, endX

  useEffect(() => {
    if(activeSlide === -1 ) setActiveSlide(children.length - 1)
    if(activeSlide > children.length - 1) setActiveSlide(0)
  }, [activeSlide, children, elWidth, elsCount])

  return (
    <div className='slider'>
      {buttons && <button className='slider__btn prev' onClick={() => setActiveSlide(activeSlide - 1)}><img src={vector} alt="" /></button>}

      <div className="slider__block" style={{width: `${elWidth * elsCount}px`}} 
        onMouseDown={(e) => {
          e.preventDefault()
          
          startX = e.nativeEvent.offsetX
          
          e.target.style.cursor = 'grabbing'
        }}
        
        onMouseUp={(e) => {
          e.preventDefault()

          endX = e.nativeEvent.offsetX
          if(startX > endX) setActiveSlide(activeSlide + 1)
          if(startX < endX) setActiveSlide(activeSlide - 1)

          e.target.style.cursor = ''
        }}
      >
        <div className="slider__line" style={{transform: `translateX(${activeSlide * -elWidth}px)`}}>
          {children}
        </div>
      </div>

      {dots && <div className="slider__dots">
        {children.map((el, index) => 
          <span key={index} className={`slider__dot ${index === activeSlide ? 'slider__active' : ''}`} onClick={() => {setActiveSlide(index * -elWidth); setActiveSlide(index)}}></span>
        )}
      </div>}

      {buttons && <button className='slider__btn next' onClick={() => setActiveSlide(activeSlide + 1)}><img src={vector} alt="" /></button>}
    </div>
  )
}
