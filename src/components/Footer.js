import React from 'react'
import { Link,Redirect } from 'react-router-dom'

function  Footer() {
  return (
    // <div>
    //   <div className="w-full bg-black text-white bottom-0 fixed">
    //     <div className="flex justify-center">
    //       <div className="p-8">
    //         <span className="flex items-center">
    //         Copyright 2022 <Link to="https://www.antsolution.in" target={'_blank'}> © Ant Solution</Link>
    //         </span>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div>
      <div class="bg-black text-center lg:text-left fixed bottom-0 w-full">
        <div class="text-white text-center p-4">
          © 2022 Copyright:
          <Link class="text-white" to="https://www.antsolution.in" target={'_blank'}>Ant Solution</Link>
        </div>
      </div>
    </div>
  )
}
export default Footer