import { useRouter } from 'next/router';
import React from 'react'

function summary() {
    const router = useRouter();
    const { query } = router.query;
    console.log(query)
  return (
    <div></div>
  )
}

export default summary