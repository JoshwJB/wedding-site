'use server'

import { z } from 'zod'
import { rsvpFormSchema } from '@/app/rsvp/rsvp-form'
import { PrismaClient } from '@prisma/client'

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
}

export type SubmitRsvp = typeof submitRsvp
