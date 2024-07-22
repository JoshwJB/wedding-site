import { cx } from 'class-variance-authority'
import { parisienne } from '@/app/fonts'
import wreath from '../../../public/botanical-wreath.svg'
import Image from 'next/image'
import Link from 'next/link'
import { submitRsvp } from '@/app/rsvp/actions'
import RsvpForm from '@/app/rsvp/rsvp-form'

export default function Rsvp() {
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

                    <Link href="/">
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
                    </Link>
                </div>

                <div className="-mt-1 w-full overflow-hidden rounded-b-[10rem] border-4 border-double border-wedding-300 p-12 py-24">
                    <h2 className="mb-8 text-center text-6xl">RSVP</h2>
                    <RsvpForm submitRsvp={submitRsvp} />
                </div>
            </div>
        </main>
    )
}
