import React from 'react'

const LoadChild = React.forwardRef((props, ref) => {
  return (
    <div className='h-1 w-full bg-gray-700 rounded overflow-hidden relative'>
      <div ref={ref} className='h-full w-0 bg-white absolute left-0 top-0'></div>
    </div>
  )
})

export default LoadChild