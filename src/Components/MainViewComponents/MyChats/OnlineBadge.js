import React from 'react'

const OnlineBadge = ({isOnline}) => {
  return (
    <span style={{
        width: "10px",
        height: "10px",
        backgroundColor: (isOnline) ? "green" : "red",
        borderRadius: "25px",
        display: "inline-block",
        marginLeft: "10px"
    }}>
    </span>
  )
}

export default OnlineBadge
