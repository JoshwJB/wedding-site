import { cx } from 'class-variance-authority'
import { parisienne } from '@/app/fonts'
import clandeboyeLodge from '../../public/clandeboye-2.jpg'
import wreath from '../../public/botanical-wreath.svg'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
    return (
        <main className="m-8 text-wedding-100 sm:m-12 md:m-24">
            <div className="mx-auto max-w-[1400px]">
                <div className="relative w-full rounded-t-[10rem] border-4 border-double border-wedding-300">
                    <Image
                        alt="Wreath top left"
                        src={wreath}
                        quality={100}
                        className="absolute -top-5 left-20 rotate-[70deg] text-red-500 max-md:hidden md:w-24 lg:w-32"
                    />

                    <Image
                        alt="Wreath top center"
                        src={wreath}
                        quality={100}
                        className="absolute -top-5 left-[50%] w-24 -translate-x-[25%] rotate-[120deg] text-red-500 md:hidden"
                    />

                    <Image
                        alt="Wreath top right"
                        src={wreath}
                        quality={100}
                        className="absolute -top-5 right-20 rotate-[-70deg] -scale-x-100 max-md:hidden md:w-24 lg:w-32"
                    />

                    <h1
                        className={cx(
                            'whitespace-pre-line px-12 pb-12 pt-24 text-center text-5xl sm:text-6xl md:py-36 md:text-7xl lg:pb-24 lg:pt-48 lg:text-9xl',
                            parisienne.className
                        )}
                    >
                        Catherine & Joshua&apos;s
                        <br />
                        Wedding
                    </h1>
                </div>

                <div className="-mt-1 grid w-full grid-cols-1 overflow-hidden rounded-b-[10rem] border-4 border-double border-wedding-300 md:grid-cols-2">
                    <div className="flex flex-col justify-center gap-12 border-double border-wedding-300 p-12 max-md:border-b-4 md:border-r-4">
                        <div>
                            <span className="text-lg font-semibold uppercase lg:text-xl">
                                When:
                            </span>
                            <h2 className="text-2xl font-semibold uppercase text-wedding-50 lg:text-3xl">
                                29 October 2024 - 2:30pm
                            </h2>
                        </div>

                        <div>
                            <span className="text-lg font-semibold uppercase lg:text-xl">
                                Where:
                            </span>
                            <a
                                href="https://maps.app.goo.gl/WTGn9upvgcVMNUum6"
                                rel="noreferrer nofollow"
                                target="_blank"
                            >
                                <h2 className="text-2xl font-semibold uppercase text-wedding-50 underline lg:text-3xl">
                                    Clandeboye Lodge
                                </h2>
                            </a>
                        </div>

                        <button
                            className="w-full cursor-not-allowed self-center border-4 border-double border-wedding-100 py-6 text-center text-xl uppercase text-wedding-50 transition-colors hover:bg-wedding-500 md:w-fit md:px-12 md:text-3xl lg:px-24 lg:py-8"
                            disabled
                        >
                            RSVP Closed
                        </button>
                    </div>

                    <div>
                        <Image
                            alt="Clandeboye Lodge - Wedding Venue"
                            src={clandeboyeLodge}
                            placeholder="blur"
                            quality={100}
                            sizes="900"
                            style={{
                                objectFit: 'cover',
                            }}
                            className="h-full w-full"
                        />
                    </div>
                </div>
            </div>
        </main>
    )
}
