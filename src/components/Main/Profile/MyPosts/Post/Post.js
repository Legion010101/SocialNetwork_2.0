import React from 'react'

import s from './Post.module.css'

function Post({data, info}) {
  return (
    <div>
      {[...data].reverse().map((post) => {
        return (
          <div key={post.id} className={s.item}>
            <img src={info.ava} alt="Avatar" />
            {post.message}
            <div>
              <span>like </span>
              {post.likesCount}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export {Post}
