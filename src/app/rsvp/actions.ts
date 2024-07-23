'use server'

import { z } from 'zod'
import { rsvpFormSchema } from '@/app/rsvp/rsvp-form'
import { PrismaClient } from '@prisma/client'
import { Resend } from 'resend'
import RsvpEmail from '../../../emails'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function submitRsvp(formEvent: z.infer<typeof rsvpFormSchema>) {
    const prisma = new PrismaClient()
    console.log('Creating RSVP for USER', formEvent)
    const user = await prisma.user.create({
        data: {
            email: formEvent.email,
            name: formEvent.name,
            rsvpCode: formEvent.rsvpCode,
            attending: formEvent.attending === 'YES',
            starter: formEvent.starter,
            mainCourse: formEvent.main,
            desert: formEvent.desert,
            dietaryReqs: formEvent.dietaryReqs,
            favSong: formEvent.favSong,
        },
    })
    await Promise.all(
        formEvent.extras.map((extra) =>
            prisma.extraPerson.create({
                data: {
                    name: extra.name,
                    starter: extra.starter!,
                    mainCourse: extra.main!,
                    desert: extra.desert!,
                    dietaryReqs: extra.dietaryReqs,
                    favSong: extra.favSong,
                    addedBy: user.id,
                },
            })
        )
    )

    await resend.emails.send({
        from: 'Catherine and Joshua <rsvp@catherineandjoshua.wedding>',
        to: [formEvent.email],
        bcc: ['josh+weddinginvites@jwjb.dev'],
        subject: "RSVP Confirmation for Catherine & Joshua's Wedding",
        react: RsvpEmail({ rsvpFormDetails: formEvent }),
    })
}

export type SubmitRsvp = typeof submitRsvp
