import { cx } from 'class-variance-authority'
import { parisienne } from '@/app/fonts'
import clandeboyeLodge from '../../public/clandeboye-2.jpg'
import Image from 'next/image'

export default function Home() {
    return (
        <main className="m-12 md:m-24">
            <div className="w-full rounded-t-[10rem] border-4 border-double border-white">
                <h1
                    className={cx(
                        'whitespace-pre-line px-12 py-24 text-center text-6xl md:py-36 lg:py-48 lg:text-9xl',
                        parisienne.className
                    )}
                >
                    Catherine & Joshua&apos;s
                    <br />
                    Wedding
                </h1>
            </div>

            <div className="-mt-1 grid w-full grid-cols-1 overflow-hidden rounded-b-[10rem] border-4 border-double border-white md:grid-cols-2">
                <div className="flex flex-col justify-center gap-12 border-double border-white p-12 max-md:border-b-4 md:border-r-4">
                    <div>
                        <span className="text-lg font-semibold uppercase lg:text-xl">
                            When:
                        </span>
                        <h2 className="text-2xl font-semibold uppercase lg:text-3xl">
                            29 October 2024 - 2:30pm
                        </h2>
                    </div>

                    <div>
                        <span className="text-lg font-semibold uppercase underline lg:text-xl">
                            Where:
                        </span>
                        <a
                            href="https://maps.app.goo.gl/WTGn9upvgcVMNUum6"
                            rel="noreferrer nofollow"
                            target="_blank"
                        >
                            <h2 className="text-2xl font-semibold uppercase lg:text-4xl">
                                Clandeboye Lodge
                            </h2>
                        </a>
                    </div>

                    <button
                        className="w-fit cursor-pointer self-center border-4 border-double border-white px-24 py-6 text-lg md:text-2xl lg:py-8"
                        disabled
                    >
                        RSVP
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

            {/*<div className="min-h-screen w-full border-[96px] border-solid border-transparent">*/}
            {/*    <div className="text-centerp-12 flex h-full w-full flex-col items-center justify-center gap-8 border border-solid border-white">*/}
            {/*        <h1*/}
            {/*            className={cx(*/}
            {/*                'whitespace-pre-line pb-8 text-6xl lg:text-9xl',*/}
            {/*                parisienne.className*/}
            {/*            )}*/}
            {/*        >*/}
            {/*            Catherine & Joshua&apos;s*/}
            {/*            <br />*/}
            {/*            Wedding*/}
            {/*        </h1>*/}
            {/*        <h2 className="text-xl font-semibold uppercase lg:text-4xl">*/}
            {/*            At the Clandeboye Lodge*/}
            {/*        </h2>*/}
            {/*        <h3 className="text-lg font-semibold uppercase lg:text-3xl">*/}
            {/*            29 October 2024 - 2:30pm*/}
            {/*        </h3>*/}
            {/*    </div>*/}
            {/*</div>*/}

            {/*<div className="flex min-h-screen w-full flex-col bg-background/90 p-24"></div>*/}
        </main>
    )
}
