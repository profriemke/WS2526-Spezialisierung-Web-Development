"use client"
import Hallo from '@/components/Hallo'
import Begruessung from '@/components/Begruessung'
import Link from 'next/link'

export default function Home() {
  const names = ['Egon', 'Liesl', 'Horsti', 'Franzi']
  return (
    <div>
      Hallo OMM!
      <Link href="/about">zu about</Link>
      <p>
        Hallo
      </p>
      <Note text="Butter kaufen"/>
      <Note text="Mobile lernen"/>
      
      <Hallo />
      <Hallo />
      <Hallo />
      <div className="flex">
      {
        names.map((element)=>{
          return(
            <Begruessung name={element}/>
          )
        })
      }
   </div>
    </div>

  );
}
