import React from 'react'

const Stage = ({name, info, date, time}) => {
  return (
    <div 
        style={{
            marginRight: "3vw",
            marginBottom: "4vh",
            display: "inline-block",
            width: "15vw",
            height: "20vh",
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        }}
    >
        <h1
            style={{
                fontSize: "1.3vw",
                textAlign: "center"
            }}
        >
            {name}
        </h1>
        <h1
            style={{
                marginLeft: "5%",
                width: "90%",
                fontSize: "0.8vw",
                textAlign: "left",
                color: "rgb(130, 130, 160)",
                fontWeight: "400",
            }}
        >
            {info}
        </h1>
    </div>
  )
}

export default Stage