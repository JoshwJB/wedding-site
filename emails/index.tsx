import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Preview,
    Text,
    Tailwind,
} from '@react-email/components'
import * as React from 'react'
import { z } from 'zod'
import { DESERTS, MAINS, rsvpFormSchema, STARTERS } from '@/app/rsvp/rsvp-form'

interface RsvpEmailProps {
    rsvpFormDetails: z.infer<typeof rsvpFormSchema>
}

export const RsvpEmail = ({ rsvpFormDetails }: RsvpEmailProps) => {
    const previewText = `RSVP Confirmation - Catherine & Joshua's Wedding`

    function mapStarterToCopy(starter: STARTERS): string {
        if (starter === 'ROASTED_TOMATO_SOUP') {
            return 'Roasted tomato soup, fresh basil and baby vine tomatoes'
        } else if (starter === 'SMOKED_SALMON') {
            return 'Locally smoked salmon and hot smoked salmon with dill and mustard seed sauce'
        } else {
            return 'N/A - Kids Menu Selected'
        }
    }

    function mapMainToCopy(starter: MAINS): string {
        if (starter === 'CHICKEN') {
            return 'Breast of manor farm chicken with chestnut mushrooms and madeira jus'
        } else if (starter === 'BEEF') {
            return 'Twice cooked point cut of beef with onion and stout gravy'
        } else if (starter === 'VEGETARIAN') {
            return 'Filo pastry with cauliflower, butter beans and spiced pumpkin cream, served with a seasonal salad. (Vegetarian)'
        } else {
            return 'Kids Option (Farm Barn - Chicken Goujons, waffles and veg)'
        }
    }

    function mapDessertToCopy(starter: DESERTS): string {
        if (starter === 'CHOCOLATE_TART') {
            return 'Dark chocolate tart with caramelised popcorn, salted butterscotch sauce and Jaffa cake ice cream'
        } else if (starter === 'PANNA_COTTA') {
            return 'Panna cotta with brandy-soaked prunes and hazelnut croquante'
        } else {
            return 'Kids Option (Ice cream)'
        }
    }

    return (
        <Html style={{ backgroundColor: '#4b644a' }}>
            <Head />
            <Preview>{previewText}</Preview>
            <Tailwind>
                <Body
                    style={{ background: '#4b644a !important' }}
                    className="background-none! mx-auto my-auto bg-white px-2 font-sans text-white"
                >
                    <Container
                        style={{ backgroundColor: '#4b644a' }}
                        className="mx-auto my-[40px] max-w-[465px] border-4 border-double border-[#b1c5b0] p-[20px]"
                    >
                        <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-white">
                            RSVP Confirmation for
                            <br /> Catherine & Joshua's Wedding
                        </Heading>
                        <Text className="text-[18px] font-medium leading-[24px] text-white">
                            When: 29 October 2024 - 2:30pm
                        </Text>
                        <Text className="text-[18px] font-medium leading-[24px] text-white">
                            Where: Clandeboye Lodge
                        </Text>

                        <Text className="mt-[24px] text-[20px] leading-[24px] text-white">
                            Below is a confirmation of your RSVP details:
                        </Text>

                        <Text className="text-lg leading-[24px] text-white">
                            Name: {rsvpFormDetails.name}
                        </Text>
                        <Text className="text-[14px] leading-[16px] text-white">
                            Attending:{' '}
                            {rsvpFormDetails.attending === 'YES' ? 'Yes' : 'No'}
                        </Text>
                        {rsvpFormDetails.attending === 'YES' && (
                            <>
                                <Text className="text-[14px] leading-[16px] text-white">
                                    Starter:{' '}
                                    {mapStarterToCopy(rsvpFormDetails.starter!)}
                                </Text>
                                <Text className="text-[14px] leading-[16px] text-white">
                                    Main Course:{' '}
                                    {mapMainToCopy(rsvpFormDetails.main!)}
                                </Text>
                                <Text className="text-[14px] leading-[16px] text-white">
                                    Dessert:{' '}
                                    {mapDessertToCopy(rsvpFormDetails.desert!)}
                                </Text>
                                <Text className="text-[14px] leading-[16px] text-white">
                                    Dietary Requirements:{' '}
                                    {rsvpFormDetails.dietaryReqs &&
                                    rsvpFormDetails.dietaryReqs.length > 0
                                        ? rsvpFormDetails.dietaryReqs
                                        : 'N/A'}
                                </Text>
                                <Text className="text-[14px] leading-[8px] text-white">
                                    Favourite Song/s:{' '}
                                    {rsvpFormDetails.favSong &&
                                    rsvpFormDetails.favSong?.length > 0
                                        ? rsvpFormDetails.favSong
                                        : 'N/A'}
                                </Text>

                                {rsvpFormDetails.extras.map((extra) => (
                                    <Container key={extra.name}>
                                        <Text className="text-lg leading-[24px] text-white">
                                            Name: {extra.name}
                                        </Text>
                                        <Text className="text-[14px] leading-[16px] text-white">
                                            Starter:{' '}
                                            {mapStarterToCopy(extra.starter!)}
                                        </Text>
                                        <Text className="text-[14px] leading-[16px] text-white">
                                            Main Course:{' '}
                                            {mapMainToCopy(extra.main!)}
                                        </Text>
                                        <Text className="text-[14px] leading-[16px] text-white">
                                            Dessert:{' '}
                                            {mapDessertToCopy(extra.desert!)}
                                        </Text>
                                        <Text className="text-[14px] leading-[16px] text-white">
                                            Dietary Requirements:{' '}
                                            {extra.dietaryReqs &&
                                            extra.dietaryReqs.length > 0
                                                ? extra.dietaryReqs
                                                : 'N/A'}
                                        </Text>
                                        <Text className="text-[14px] leading-[8px] text-white">
                                            Favourite Song/s:{' '}
                                            {extra.favSong &&
                                            extra.favSong?.length > 0
                                                ? extra.favSong
                                                : 'N/A'}
                                        </Text>
                                    </Container>
                                ))}
                            </>
                        )}
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    )
}

RsvpEmail.PreviewProps = {
    rsvpFormDetails: {
        rsvpCode: '123456',
        name: 'Joshua Barber',
        email: 'josh@jwjb.dev',
        attending: 'YES',
        extras: [
            {
                name: 'Catherine Little',
                starter: 'SMOKED_SALMON',
                main: 'BEEF',
                desert: 'PANNA_COTTA',
                dietaryReqs: '',
                favSong: '',
            },
        ],
        starter: 'ROASTED_TOMATO_SOUP',
        main: 'CHICKEN',
        desert: 'CHOCOLATE_TART',
        dietaryReqs: 'N/A',
        favSong: 'The Menzingers - After the Party',
    },
} as RsvpEmailProps

export default RsvpEmail
