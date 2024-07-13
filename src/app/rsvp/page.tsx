import { cx } from 'class-variance-authority'
import { parisienne } from '@/app/fonts'

export default function Page() {
    return (
        <main className="flex flex-col items-center">
            <div className="flex min-h-screen w-full flex-col items-center justify-center gap-8 p-24 text-center">
                <h1
                    className={cx(
                        'pb-8 text-6xl lg:text-9xl',
                        parisienne.className
                    )}
                >
                    RSVP
                </h1>
                <h2 className="text-xl font-semibold uppercase lg:text-4xl">
                    At the Clandeboye Lodge
                </h2>
                <h3 className="text-lg font-semibold uppercase lg:text-3xl">
                    29 October 2024 - 2:30pm
                </h3>
            </div>

            {/*<div className="flex min-h-screen w-full flex-col bg-background/90 p-24"></div>*/}
        </main>
    )
}
