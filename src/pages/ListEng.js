import React from 'react'

function ListEng (props) {
  const ListEng = props.menu
  return (
    <ul>
      {
        ListEng.map((item, index) => {
          return (
            <li key={index}>
              <div>
              Nama : {item.name_eng}
              </div>
              <div>
              Nama : {item.name_eng}
              </div>
            </li>
          )
        })
      }
    </ul>
  )
}

export default ListEng