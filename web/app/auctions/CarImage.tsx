'use client'

import Image from 'next/image'
import { useState } from 'react'

type Props = {
    imageUrl: string
    alt: string
}

export default function CarImage({ imageUrl, alt }: Props) {
    const [isLoading, setIsLoading] = useState(true)

    return (
        <Image
            fill
            priority
            alt={alt}
            src={imageUrl}
            className={`object-cover gorup-hover:opacity-75 duration-700 ease-in-out ${isLoading ? 'grayscale blur-2xl scale-110' : 'grayscale-0 blur-0 scale-100'}`}
            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 25vw"
            onLoad={() => setIsLoading(false)}
        />
    )
}
